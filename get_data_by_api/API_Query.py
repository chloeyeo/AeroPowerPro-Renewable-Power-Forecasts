# 1. Firstly, we will download the data by the RESTFul API of Elexon website

#! /usr/bin/env python
import time
import datetime
import httplib2
import pyodbc
import pandas as pd
import schedule


def get_data_by_restful(settlementDate, period, API_version='v2', API_key='ly8us8nfodbrypm', serviceType='csv'):
    '''
    The following code is written in python and demonstrates calling the Elexon RESTFul API.
    Please note that you need to replace the YOUR_API_KEY_HERE with the key from the Elexon portal.

    :param settlementDate: the format of settlement date should be YYYY-MM-DD, e.g.2021-12-31
    :param period: period could be 1-50 in this API
    :param API_version: the API version should be v2, the other version are not available now
    :param API_key: this is the scripting key of user profile in Elexon website after registration
    :param serviceType: serviceType could be csv or xml
    :return:
    '''

    url = 'https://api.bmreports.com/BMRS/B1610/' + API_version + '?APIKey=' + API_key + '&SettlementDate=' + settlementDate + \
          '&Period=' + period + '&ServiceType=' + serviceType

    post_elexon(url=url,)


def post_elexon(url):
    http_obj = httplib2.Http()
    # the request will return a tuple including the response header and the content, where content is a binary string
    resp, content = http_obj.request(uri=url, method='GET', headers={'Content-Type': 'application/xml; charset=UTF-8'}, )

    # convert the binary string to string
    content_str = content.decode("ascii")
    content_str_list = content_str.split("\n")

    # Create a cursor from the connection
    cursor = cnxn.cursor()
    # insert the data into the MySQL Database
    insert_sql = "INSERT INTO windpower(time_series_id, registered_resource_eic_code, bm_unit_id, ngc_bm_unit_id, psr_type, " \
                 "market_generation_unit_eic_code, market_generation_bm_unit_id, market_generation_ngc_bm_unit_id, " \
                 "settlement_date, settlement_period, quantity) "

    for idx in range(11, len(content_str_list)):
        value_str = content_str_list[idx]
        value_str_list = value_str.split(",")
        value_str_list_new = ['"' + value_str_list[i] + '"' for i in range(len(value_str_list))]
        value_str_list_new[9] = eval(value_str_list_new[9])
        cursor.execute(insert_sql + "values (" + ','.join(value_str_list_new) + ");")
        cnxn.commit()


def get_data_from_local_database():
    cursor = cnxn.cursor()
    cursor.execute("select * from windpower;")
    rows = cursor.fetchall()
    for row in rows:
        print(row)


def schedule_job():
    '''
    This is job will be done once every 6 hours
    :return:
    '''
    global last_period
    latest_period = last_period + time.gmtime().tm_hour*2      # the restful api updates 2 times every hour

    if latest_period > 48:
        latest_period %= 48
        # get the data for the yesterday
        yesterday = datetime.date.today() - datetime.timedelta(-1)
        yes_year, yes_cur_month, yes_cur_day = str(yesterday).split("-")
        for cur_period in range(last_period, 49):
            get_data_by_restful(settlementDate=yes_year + '-' + yes_cur_month.zfill(2) + '-' + yes_cur_day.zfill(2), period=str(cur_period))

        # get the data for the current day
        for cur_period in range(1, latest_period):
            get_data_by_restful(settlementDate=str(time.gmtime().tm_year) + '-' + str(time.gmtime().tm_mon).zfill(2) + '-' + str(time.gmtime().tm_mday).zfill(2), period=str(cur_period))
    else:
        for cur_period in range(last_period, latest_period+1):
            get_data_by_restful(settlementDate=str(time.gmtime().tm_year) + '-' + str(time.gmtime().tm_mon).zfill(2) + '-' + str(time.gmtime().tm_mday).zfill(2), period=str(cur_period))
    last_period = latest_period


if __name__ == "__main__":
    # tartup example
    # get_data_by_restful(settlementDate='2022-01-01', period='1')

    # 1. connect to database with the following setting
    # 1.1 Specifying the ODBC driver, server name, database, etc. directly
    connection_string = (
        'DRIVER=MySQL ODBC 8.0 ANSI Driver;'
        'SERVER=localhost;'
        'DATABASE=sh33;'
        'UID=root;'
        'PWD=Mark131545;'
        'charset=utf8mb4;'
    )
    # 1.2 connect to the localhost MySQL Database with the above connection setting
    cnxn = pyodbc.connect(connection_string)

    # 1.3 set the encoding or decoding settings needed for your database
    cnxn.setdecoding(pyodbc.SQL_WCHAR, encoding='utf-8')
    cnxn.setencoding(encoding='utf-8')

    # get_data_by_restful(settlementDate='2022-01-01', period='1')

    # 2. read from restful api and store the data into database. You should config the date when using it.
    start_date = "2022-01-02"
    end_date = "2022-11-16"

    frame = pd.date_range(start=start_date, end=end_date)
    for i in range(len(frame)):
        date = str(frame[i]).split(" ")[0]
        year, month, day = date.split("-")
        print(f"Inserting Data to Database for Current Date: {str(year) + '-' + str(month).zfill(2) + '-' + str(day).zfill(2)}")
        get_data_by_restful(settlementDate=year + '-' + month.zfill(2) + '-' + day.zfill(2), period="*")

    # set the period for getting data from restful api next period
    last_period = time.gmtime().tm_hour*2           # the restful api updates 2 times every hour

    # create periodic task and do it every 6 hours starting from this script started running
    schedule.every(6).hours.do(schedule_job)
    while True:
        schedule.run_pending()
        # sleep for 5 hours and 55 minutes before next retrieval
        time.sleep(21300)
