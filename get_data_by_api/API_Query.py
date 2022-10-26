# 1. Firstly, we will download the data by the RESTFul API of Elexon website

#! /usr/bin/env python
import httplib2
from pprint import pformat  # These aren't needed, just for this example


def post_elexon(url):
    http_obj = httplib2.Http()
    resp, content = http_obj.request(uri=url, method='GET', headers={'Content-Type': 'application/xml; charset=UTF-8'}, )

    print('===Response===')
    print(pformat(resp))
    print('===Content===')
    print(pformat(content))
    print('===Finished===')


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


if __name__ == "__main__":
    get_data_by_restful(settlementDate='2022-01-01', period='1')

    # for year in range(2010, 2023, 1):
    #     for month in range(1, 13, 1):
    #         for day in range(1, 32, 1):
    #             if month in [4, 6, 9, 11] and day == 31:
    #                 break
    #             elif year in [2012, 2016, 2020] and month == 2 and day == 30:
    #                 break
    #             elif month == 2 and day == 29:
    #                 break
    #
    #             get_data_by_restful(settlementDate= str(year) + '-' + str(month) + '-' + str(day), period='1')
