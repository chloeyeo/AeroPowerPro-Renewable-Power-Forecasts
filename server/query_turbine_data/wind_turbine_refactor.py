import pandas as pd
import numpy as np
# Constant Value
LATITUDE = 'Latitude'
LONGITUDE = 'Longitude'
PLANT_TYPE = 'Plant Type'
HUB_HEIGHT = 'Hub-Height'
TURBINE_CAPACITY = 'Turbine Capacity (MW)'
NUM_TURBINES = 'No. of Turbines'
X_COORDINATE = "X-coordinate"
Y_COORDINATE = 'Y-coordinate'

class QueryWindTurbineRefactor:

    def __init__(self, link):
        self.df_attrs = pd.read_csv(link)
        self.dict_bm_to_id = self.__create_dict_wind_bm_to_id()

    def __create_dict_wind_bm_to_id(self):
        df2 = self.df_attrs.query("value == 'WIND'")
        return dict(df2[['id', 'dictionary_id']].values)

    def __get_id_from_bm(self, bm):
        return self.dict_bm_to_id.get(bm)
    
    def check_bm_in_data(self, bm):
        if(bm in self.dict_bm_to_id.keys()):
            return True
        return False
    
    def get_data_from_bm(self, data_type, bm):
        id = self.__get_id_from_bm(bm)
        df_id = self.df_attrs.query(f"dictionary_id == {id}")
        if df_id.query(f"attribute == '{data_type}'")[['id', 'value']].values.size > 0:
            # if it exist then return the values
            return df_id.query(f"attribute == '{data_type}'")[['id', 'value']].values[0][1]
        else:
            # if it does not exist then return None
            print(f"It is not exist {data_type} for {id} in the CSV")
            return 

# attributes_fp = 'https://osuked.github.io/Power-Station-Dictionary/object_attrs/dictionary_attributes.csv'
# test = QueryWindTurbineRefactor(attributes_fp)
# print(test.get_data_from_bm(LATITUDE, 'BRBEO-1'))
# print(test.get_data_from_bm(LONGITUDE, 'BRBEO-1'))
# print(test.get_data_from_bm(PLANT_TYPE, 'BRBEO-1'))
# print(test.get_data_from_bm(TURBINE_CAPACITY, 'BRBEO-1'))