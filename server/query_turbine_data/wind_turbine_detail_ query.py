import pandas as pd
import numpy as np
from collections import Counter

# Constant Value
OPERATOR = 'Operator (or Applicant)'
SITENAME = 'Site Name'
TECHTYPE = 'Technology Type'
HUB_HEIGHT = 'Hub-Height'
TURBINE_CAPACITY = 'Turbine Capacity (MW)'
NUM_TURBINES = 'No. of Turbines'
TURBINE_HEIGHT = "Height of Turbines (m)"
X_COORDINATE = "X-coordinate"
Y_COORDINATE = 'Y-coordinate'


class QueryWindTurbineRefactor:

    def __init__(self, link):
        self.df_attrs = pd.read_csv(link, encoding= 'latin1')
        self.__query_wind_farms()
        self.__query_essential_data([X_COORDINATE, Y_COORDINATE])
    
    def __query_wind_farms(self):
        self.df_attrs = self.df_attrs[self.df_attrs['Technology Type'].isin(['Wind Offshore', 'Wind Onshore'])]

    def __query_essential_data(self, list_of_columns):
        self.df_attrs = self.df_attrs[list_of_columns]
        

attributes_fp = "https://osuked.github.io/Power-Station-Dictionary/attribute_sources/renewable-energy-planning-database/renewable-energy-planning-database-q2-june-2021.csv"

test = QueryWindTurbineRefactor(attributes_fp)
print(test.df_attrs)
# print(test.get_data_from_bm(LATITUDE, 'BRBEO-1'))
# print(test.get_data_from_bm(LONGITUDE, 'BRBEO-1'))
# print(test.get_data_from_bm(PLANT_TYPE, 'BRBEO-1'))
# print(test.get_data_from_bm(TURBINE_CAPACITY, 'BRBEO-1'))
# print(test.get_data_from_bm(OPERATOR, 'BRBEO-1'))
# print(test.counter_bm_in_id[10194])
# print(test.dict_bm_to_id.get("MIDMW-1"))