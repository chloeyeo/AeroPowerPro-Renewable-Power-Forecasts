import os
import sys
import math

sys.path.append(os.path.abspath(os.path.join(__file__, *[os.pardir]*2))) # append root directory to sys.path
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

import django
django.setup()

from backend_db.models import WindFarmDetailData
from query_turbine_data.wind_turbine_detail_query import QueryWindTurbineDetailRefactor

OPERATOR = 'Operator (or Applicant)'
SITENAME = 'Site Name'
TECHTYPE = 'Technology Type'
TURBINE_CAPACITY = 'Turbine Capacity (MW)'
NUM_TURBINES = 'No. of Turbines'
TURBINE_HEIGHT = "Height of Turbines (m)"
DEVELOPMENT_STATUS = "Development Status"
X_COORDINATE = "X-coordinate"
Y_COORDINATE = 'Y-coordinate'
LATITUDE = 'Latitude'
LONGITUDE = 'Longitude'

def is_onshore(x):
    print(x)
    if (x == 'Wind Onshore'):
        return True
    return False

def main():
    attributes_fp = "https://osuked.github.io/Power-Station-Dictionary/attribute_sources/renewable-energy-planning-database/renewable-energy-planning-database-q2-june-2021.csv"
    wind_query = QueryWindTurbineDetailRefactor(attributes_fp)

    for row in wind_query.df_attrs.itertuples():
        data_dict = {}
        data_dict['operator'] = row[1]
        data_dict['sitename'] = row[2]
        data_dict['is_onshore'] = is_onshore(row[3])
        if(not math.isnan(row[4])):
            data_dict['turbine_height'] = row[4]
        else:
            data_dict['turbine_height'] = None
        if(not math.isnan(row[5])):
            data_dict['number_of_turbines'] = row[5]
        else:
            data_dict['number_of_turbines'] = None
        if(not math.isnan(row[6])):
            data_dict['turbine_capacity'] = row[6]
        else:
            data_dict['turbine_capacity'] = None
        
        data_dict['development_status'] = row[7]
        if(not math.isnan(row[8])):
            data_dict['x_coordinate'] = row[8]
        else:
            data_dict['x_coordinate'] = None
        if(not math.isnan(row[9])):
            data_dict['y_coordinate'] = row[9]
        else:
            data_dict['y_coordinate'] = None
        
        data_dict['address'] = row[10]
        data_dict['region'] = row[11]
        data_dict['country'] = row[12]

        if(not math.isnan(row[13])):
            data_dict['longitude'] = row[13]
        else:
            data_dict['longitude'] = None
        if(not math.isnan(row[14])):
            data_dict['latitude'] = row[14]
        else:
            data_dict['latitude'] = None

        WindFarmDetailData.objects.create(**data_dict)
        print(f"turbine operator name {row[1]} with sitename {row[2]} inserted")