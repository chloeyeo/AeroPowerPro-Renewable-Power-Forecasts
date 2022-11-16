# 1. Firstly, we will download the data by the RESTFul API of Elexon website

#! /usr/bin/env python
import httplib2
import pyodbc
import pandas as pd
from datetime import datetime

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
    end_date = "2022-01-05"

    frame = pd.date_range(start=start_date,end=end_date)
    for i in range(len(frame)):
        date = str(frame[i]).split(" ")[0]
        year, month, day = date.split("-")
        print(f"Inserting Data to Database for Current Date: {str(year) + '-' + str(month).zfill(2) + '-' + str(day).zfill(2)}")
        get_data_by_restful(settlementDate=year + '-' + month.zfill(2) + '-' + day.zfill(2), period="*")

    #this code is wrong for query the date
    start_date_list = start_date.split("-")
    end_date_list = end_date.split("-")

    start_year = int(start_date_list[0])
    end_year = int(end_date_list[0])

    start_month = int(start_date_list[1])
    end_month = int(end_date_list[1])

    start_day = int(start_date_list[2])
    end_day = int(end_date_list[2])

    # for year in range(start_year, end_year + 1):
    #     for month in range(start_month, end_month + 1):
    #         for day in range(start_day, end_day + 1):
    #             if month in [4, 6, 9, 11] and day == 31:
    #                 break
    #             elif year in [2012, 2016, 2020] and month == 2 and day == 30:
    #                 break
    #             elif month == 2 and day == 29:
    #                 break

    #             print(f"Inserting Data to Database for Current Date: {str(year) + '-' + str(month).zfill(2) + '-' + str(day).zfill(2)}")
    #             for period in range(1, 51, 1):
    #                 get_data_by_restful(settlementDate=str(year) + '-' + str(month).zfill(2) + '-' + str(day).zfill(2), period=str(period))
