import os
import sys

sys.path.append(os.path.abspath(os.path.join(__file__, *[os.pardir]*2))) # append root directory to sys.path
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

import django
django.setup()

from backend_db.models import GSPLocation
import pandas as pd

def main():
    df_attrs = pd.read_csv('https://data.nationalgrideso.com/backend/dataset/2810092e-d4b2-472f-b955-d8bea01f9ec0/resource/bbe2cc72-a6c6-46e6-8f4e-48b879467368/download/gsp_gnode_directconnect_region_lookup.csv', encoding= 'latin1')
    df_attrs = df_attrs[['gsp_id', 'gsp_name', 'gsp_lat', 'gsp_lon']].drop_duplicates()
    df_attrs = df_attrs.dropna()

    gsp_dict = df_attrs.to_dict(orient = 'index')

    for row in gsp_dict:
        data_dict = gsp_dict[row]
        GSPLocation.objects.create(**data_dict)
        print(f"Inserted GSP Location: {data_dict['gsp_id']}")