import os
import sys

sys.path.append(os.path.abspath(os.path.join(__file__, *[os.pardir]*2))) # append root directory to sys.path
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

import django
django.setup()

from backend_db.solar_energy_data import SolarFarmDetailData
from query_solar_data.query_solar_data import QuerySolarFarmDetail


attributes_fp = "https://osuked.github.io/Power-Station-Dictionary/attribute_sources/renewable-energy-planning-database/renewable-energy-planning-database-q2-june-2021.csv"
solar_query = QuerySolarFarmDetail(attributes_fp)
solar_dataframe = solar_query.get_dataframe()

solar_dict = solar_dataframe.to_dict(orient = 'index')

def main():
    for row in solar_dict:
        data_dict = solar_dict[row]

        data_dict['operator'] = data_dict['Operator (or Applicant)']
        del data_dict['Operator (or Applicant)']

        data_dict['x_coordinate'] = data_dict['X-coordinate']
        del data_dict['X-coordinate']

        data_dict['y_coordinate'] = data_dict['Y-coordinate']
        del data_dict['Y-coordinate']

        data_dict['sitename'] = data_dict['Site Name']
        del data_dict['Site Name']

        data_dict['development_status'] = data_dict['Development Status']
        del data_dict['Development Status']

        data_dict['mounting_type_for_solar'] = data_dict['Mounting Type for Solar']
        del data_dict['Mounting Type for Solar']

        data_dict['address'] = data_dict['Address']
        del data_dict['Address']

        data_dict['region'] = data_dict['Region']
        del data_dict['Region']

        data_dict['country'] = data_dict['Country']
        del data_dict['Country']

        data_dict['longitude'] = data_dict['Longitude']
        del data_dict['Longitude']

        data_dict['latitude'] = data_dict['Latitude']
        del data_dict['Latitude']

        SolarFarmDetailData.objects.create(**data_dict)
        print(f"Solar Farm Name: {data_dict['sitename']} Operator: {data_dict['operator']} inserted")
main()
