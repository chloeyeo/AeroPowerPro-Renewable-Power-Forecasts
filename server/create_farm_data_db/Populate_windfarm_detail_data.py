import os
import sys

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
X_COORDINATE = "X-coordinate"
Y_COORDINATE = 'Y-coordinate'
LATITUDE = 'Latitude'
LONGITUDE = 'Longitude'

def is_onshore(x):
    print(x)
    if (x == 'Wind Onshore'):
        return True
    return False

attributes_fp = "https://osuked.github.io/Power-Station-Dictionary/attribute_sources/renewable-energy-planning-database/renewable-energy-planning-database-q2-june-2021.csv"
wind_query = QueryWindTurbineDetailRefactor(attributes_fp)

for row in wind_query.df_attrs.itertuples():
    data_dict = {}
    data_dict['operator'] = row[1]
    data_dict['sitename'] = row[2]
    data_dict['is_onshore'] = is_onshore(row[3])
    data_dict['turbine_height'] = row[4]
    data_dict['number_of_turbines'] = row[5]
    data_dict['turbine_capacity'] = row[6]
    data_dict['x_coordinate'] = row[7]
    data_dict['y_coordinate'] = row[8]
    # data_dict['longitude'] = row[9]
    # data_dict['latitude'] = row[10]

    WindFarmDetailData.objects.create(**data_dict)
    print(f"turbine operator name {row[1]} with sitename {row[2]} inserted")