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

pvl = PVLive()

solar_df = pvl.between(start=datetime(2020, 1, 1, 0, 30, tzinfo=pytz.utc), end=datetime(2021, 1, 1, tzinfo=pytz.utc), dataframe=True).sort_values(by = ['datetime_gmt'])

solar_dict = solar_df.to_dict(orient = 'index')

def main():
    for row in solar_dict:
        data_dict = solar_dict[row]
        SolarEnergyData.objects.create(**data_dict)
        print(f"Solar Energy GSP: {data_dict['gsp_id']} Time: {data_dict['datetime_gmt']} inserted")