# 1. Firstly, we will download the data by the RESTFul API of Elexon website

#! /usr/bin/env python

# setup Django
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
import django
django.setup()

import time
import pytz
import datetime
from dateutil.relativedelta import relativedelta
import httplib2
import pandas as pd
from backend_db.models import ActualProduceElectricity
from django.db import transaction
from get_latest_date import get_latest_date



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



@transaction.atomic
def post_elexon(url):
    http_obj = httplib2.Http()
    # the request will return a tuple including the response header and the content, where content is a binary string
    resp, content = http_obj.request(uri=url, method='GET', headers={'Content-Type': 'application/xml; charset=UTF-8'},)
    # convert the binary string to string
    content_str = content.decode("ascii")
    content_str_list = content_str.split("\n")
    # print(len(content_str_list))
    for idx in range(11, len(content_str_list)):
        # create list of data from the API
        value_str = content_str_list[idx]
        value_str_list = value_str.split(",")
        value_str_list_new = [value_str_list[i] for i in range(len(value_str_list))]

        # insert data into the database (SQLite)
        ActualProduceElectricity.objects.create(time_series_id=value_str_list_new[0],
                                                registed_resource_eic_code=value_str_list_new[1],
                                                bm_unit_id=value_str_list_new[2],
                                                ngc_bm_unit_id=value_str_list_new[3],
                                                psr_type=value_str_list_new[4],
                                                market_generation_unit_eic_code=value_str_list_new[5],
                                                market_generation_bmu_id=value_str_list_new[6],
                                                market_generation_ngc_bmu_id=value_str_list_new[7],
                                                settlement_date=value_str_list_new[8],
                                                period=int(value_str_list_new[9]),
                                                quantity=float(value_str_list_new[10]))


def elexon_schedule_job():
    today = datetime.datetime.now()
    start_time = today.replace(tzinfo=pytz.UTC)      # set datetime format to non-ambiguous, standard UTC
    end_time = get_latest_date(ActualProduceElectricity, start_time, 'settlement_date')
    if type(end_time) != type(start_time):
        end_time = end_time.settlement_date
    else:
        end_time = datetime.datetime.combine(end_time, datetime.datetime.min.time())
    frame = pd.date_range(end=str(start_time.date()), start=str(end_time))

    for i in range(len(frame)):
        date = str(frame[i]).split(" ")[0]
        year, month, day = date.split("-")
        print(f"Inserting Data to Database for Current Date: {str(year) + '-' + str(month).zfill(2) + '-' + str(day).zfill(2)}")
        get_data_by_restful(settlementDate=year + '-' + month.zfill(2) + '-' + day.zfill(2), period="*")

    
    
if __name__ == '__main()__':
    elexon_schedule_job()
