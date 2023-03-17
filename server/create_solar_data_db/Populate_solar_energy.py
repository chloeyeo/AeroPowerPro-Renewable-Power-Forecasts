import os
import sys

sys.path.append(os.path.abspath(os.path.join(__file__, *[os.pardir]*2))) # append root directory to sys.path
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

import django
django.setup()

from backend_db.models import SolarEnergyData
from datetime import datetime
import pytz
from pvlive_api import PVLive
from get_latest_date import get_latest_date


pvl = PVLive()

def get_solar_energy(start_date, end_date):
    START_YEAR = start_date.year
    START_MONTH = start_date.month
    START_DAY = start_date.day
    
    END_YEAR = end_date.year
    END_MONTH = end_date.month
    END_DAY = end_date.day
    
    for i in pvl.gsp_ids:
        solar_df = pvl.between(start=datetime(START_YEAR, START_MONTH, START_DAY, tzinfo=pytz.utc), end=datetime(END_YEAR, END_MONTH, END_DAY, tzinfo=pytz.utc), dataframe=True, entity_id = i).sort_values(by = ['datetime_gmt'])
        solar_dict = solar_df.to_dict(orient = 'index')
        for row in solar_dict:
            data_dict = solar_dict[row]
            try:
                SolarEnergyData.objects.create(**data_dict)
                print(f"Solar Energy GSP: {data_dict['gsp_id']} Time: {data_dict['datetime_gmt']} inserted")
            except django.db.utils.IntegrityError as e:
                print(f"Could not insert{data_dict['gsp_id']} Time: {data_dict['datetime_gmt']}. Error: {e}")

def main():
    today = datetime.now()
    end_date = today.replace(tzinfo=pytz.UTC)      # set datetime format to non-ambiguous, standard UTC
    start_date = get_latest_date(SolarEnergyData, end_date, 'datetime_gmt')
    
    if type(start_date) != type(end_date):
        start_date = start_date.datetime_gmt
    
    get_solar_energy(start_date, end_date)