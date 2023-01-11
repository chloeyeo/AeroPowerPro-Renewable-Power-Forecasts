import os
import sys

sys.path.append(os.path.abspath(os.path.join(__file__, *[os.pardir]*2))) # append root directory to sys.path

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
import django
django.setup()

from query_turbine_data.open_csv_data import OpenCsvData
from query_turbine_data.wind_turbine_query import QueryWindTurbineData
from backend_db.models import ActualProduceElectricity, WindFarmData
from pprint import pprint
import numpy as np

wind_farm_data = OpenCsvData("dictionary_attributes.csv")
data = wind_farm_data.get_fuel_ids_type()
wind_query = QueryWindTurbineData(data)
farms = ActualProduceElectricity.objects.values_list('ngc_bm_unit_id', flat=True).distinct()

onshore_offshore = lambda x : True if (x == 'onshore') else False

elexon_ids = ActualProduceElectricity.objects.values_list('market_generation_ngc_bmu_id', flat=True).distinct()

for bm_unit_id in farms:
    farm_id = wind_query.get_id(bm_unit_id)
    # print(f"id in elexon data{farm_id in farms}")

    if farm_id is not None:
        data_dict = {}
        # farm_id.append(farm_id)
        data_dict['longitude'] = wind_query.get_longitude_from_id(farm_id)
        if (data_dict['longitude'] == None):
            print ('No longitude for ', farm_id)
            continue
        data_dict['longitude'] = np.mean(data_dict['longitude'])

        data_dict['latitude'] = wind_query.get_latitude_from_id(farm_id)
        if (data_dict['latitude'] == None):
            print("No latitude for ", farm_id)
            continue
        # print(data_dict['latitude'])
        data_dict['latitude'] = np.mean(data_dict['latitude'])

        data_dict['hub_height'] = wind_query.get_hub_hight_from_id(farm_id)
        if data_dict['hub_height'] is None:
            data_dict['hub_height'] = 100
        # print(data_dict['hub_height'])
        data_dict['hub_height'] = np.mean(data_dict['hub_height'])

        data_dict['number_of_turbines'] = wind_query.get_number_turbine_from_id(farm_id)
        if data_dict['number_of_turbines'] is None:
            data_dict['number_of_turbines'] = 50
        # print(data_dict['number_of_turbines'])
        data_dict['number_of_turbines'] = np.mean(data_dict['number_of_turbines'])

        data_dict['turbine_capacity'] = wind_query.get_turbine_capacity_from_id(farm_id) 
        if data_dict['turbine_capacity'] is None:
            data_dict['turbine_capacity'] = 3
        # print(data_dict['turbine_capacity'])
        data_dict['turbine_capacity'] = np.mean(data_dict['turbine_capacity'])

        data_dict['turbine_capacity'] = data_dict['turbine_capacity'] * 1000000 #convert to W
        data_dict['is_onshore'] = onshore_offshore(wind_query.get_plant_type_from_id(farm_id))
        print(data_dict['is_onshore'], wind_query.get_plant_type_from_id(farm_id))

        all_data = wind_query.get_data_from_id(farm_id)
        # for data in all_data:
        #     print(data)
        print("\n\n\n")
        WindFarmData.objects.create(**data_dict)
        print(f'{farm_id} inserted')

