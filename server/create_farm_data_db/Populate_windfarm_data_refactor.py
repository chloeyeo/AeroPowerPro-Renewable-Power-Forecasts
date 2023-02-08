import os
import sys

sys.path.append(os.path.abspath(os.path.join(__file__, *[os.pardir]*2))) # append root directory to sys.path
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

import django
django.setup()

from query_turbine_data.wind_turbine_refactor import QueryWindTurbineRefactor
from backend_db.models import ActualProduceElectricity, WindFarmData
import numpy as np

LATITUDE = 'Latitude'
LONGITUDE = 'Longitude'
PLANT_TYPE = 'Plant Type'
HUB_HEIGHT = 'Hub-Height'
TURBINE_CAPACITY = 'Turbine Capacity (MW)'
NUM_TURBINES = 'No. of Turbines'
X_COORDINATE = "X-coordinate"
Y_COORDINATE = 'Y-coordinate'
OPERATOR = "Operator (or Applicant)"

def is_onshore(x):
    print(x)
    if (x == 'onshore'):
        return True
    return False


def get_windfarms():
    attributes_fp = 'https://osuked.github.io/Power-Station-Dictionary/object_attrs/dictionary_attributes.csv'
    wind_query = QueryWindTurbineRefactor(attributes_fp)
    farms = ActualProduceElectricity.objects.values_list('ngc_bm_unit_id', flat=True).distinct()


    for bm_unit_id in farms:
        # farm_id = wind_query.get_id(bm_unit_id)
        # print(f"id in elexon data{farm_id in farms}")

        if wind_query.check_bm_in_data(bm_unit_id):
            data_dict = {}
            # farm_id.append(farm_id)
            longitude = wind_query.get_data_from_bm(LONGITUDE, bm_unit_id)
            if(np.any(longitude)):
                data_dict['longitude'] = float(longitude[0][1])
                print(float(longitude[0][1]))
            else:
                print ('No longitude for ', bm_unit_id)
                continue

            latitide = wind_query.get_data_from_bm(LATITUDE, bm_unit_id)
            if (np.any(latitide)):
                data_dict['latitude'] = float(latitide[0][1])
                print(float(latitide[0][1]))
            else:
                print("No latitude for ", bm_unit_id)
                continue

            hub_height = wind_query.get_data_from_bm(HUB_HEIGHT, bm_unit_id)
            if(np.any(hub_height)):
                data_dict['hub_height'] = np.mean(hub_height.astype(float))
            else:   data_dict['hub_height'] = 100

            number_of_turbines = wind_query.get_data_from_bm(NUM_TURBINES, bm_unit_id)
            if(np.any(number_of_turbines)):
                data_dict['number_of_turbines'] = np.sum(number_of_turbines.astype(float))/wind_query.counter_bm_in_id[wind_query.get_id_from_bm(bm_unit_id)]
                print("No. of turbines:", np.sum(number_of_turbines.astype(float))/wind_query.counter_bm_in_id[wind_query.get_id_from_bm(bm_unit_id)])
            else:   data_dict['number_of_turbines'] = 50

            turbine_capacity = wind_query.get_data_from_bm(TURBINE_CAPACITY, bm_unit_id)
            if(np.any(turbine_capacity)):
                data_dict['turbine_capacity'] = np.sum(turbine_capacity.astype(float))/wind_query.counter_bm_in_id[wind_query.get_id_from_bm(bm_unit_id)]
                print("Turbine Capacity (MW):", np.sum(turbine_capacity.astype(float))/wind_query.counter_bm_in_id[wind_query.get_id_from_bm(bm_unit_id)])
            else:   data_dict['turbine_capacity'] = 3
            data_dict['turbine_capacity'] = data_dict['turbine_capacity'] * 1000000 #convert to W
            
            plant_type = wind_query.get_data_from_bm(PLANT_TYPE, bm_unit_id)
            if(np.any(plant_type)):
                data_dict['is_onshore'] = is_onshore(plant_type[0][1])
            else:   data_dict['is_onshore'] = None

            print("\n\n\n")
            WindFarmData.objects.create(**data_dict)
            print(f'{bm_unit_id} inserted')
            
get_windfarms()
