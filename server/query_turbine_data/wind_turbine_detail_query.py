import pandas as pd
import pyproj
crs_british = pyproj.CRS('EPSG:27700')
crs_wgs84 = pyproj.CRS('EPSG:4326')

# Constant Value
OPERATOR = 'Operator (or Applicant)'
SITENAME = 'Site Name'
TECHTYPE = 'Technology Type'
TURBINE_CAPACITY = 'Turbine Capacity (MW)'
NUM_TURBINES = 'No. of Turbines'
TURBINE_HEIGHT = "Height of Turbines (m)"
DEVELOPMENT_STATUS = "Development Status"
X_COORDINATE = "X-coordinate"
Y_COORDINATE = 'Y-coordinate'
ADDRESS = 'Address'
COUNTRY = 'Country'
REGION = 'Region'

current_link = "https://osuked.github.io/Power-Station-Dictionary/attribute_sources/renewable-energy-planning-database/renewable-energy-planning-database-q2-june-2021.csv"

class QueryWindTurbineDetailRefactor:

    def __init__(self, link):
        self.df_attrs = pd.read_csv(link, encoding= 'latin1')
        self.__query_wind_farms()
        self.__query_essential_data([OPERATOR, SITENAME, TECHTYPE, TURBINE_CAPACITY, NUM_TURBINES, TURBINE_HEIGHT, DEVELOPMENT_STATUS, X_COORDINATE, Y_COORDINATE, ADDRESS, REGION, COUNTRY])
        self.__create_lat_long_from_bng()
    
    def __query_wind_farms(self):
        self.df_attrs = self.df_attrs[self.df_attrs['Technology Type'].isin(['Wind Offshore', 'Wind Onshore'])]

    def __query_essential_data(self, list_of_columns):
        self.df_attrs = self.df_attrs[list_of_columns]
    
    def __create_lat_long_from_bng(self):
        long_lst = []
        lat_lst = []
        transformer = pyproj.Transformer.from_crs(crs_british, crs_wgs84)
        for row in self.df_attrs.itertuples():
            long, lat = transformer.transform(row[8], row[9])
            long_lst.append(long)
            lat_lst.append(lat)
        self.df_attrs['Longitude'], self.df_attrs['Latitude'] = long_lst, lat_lst