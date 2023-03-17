import pandas as pd
import pyproj
crs_british = pyproj.CRS('EPSG:27700')
crs_wgs84 = pyproj.CRS('EPSG:4326')

# Constant Value
OPERATOR = 'Operator (or Applicant)'
SITENAME = 'Site Name'
DEVELOPMENT_STATUS = "Development Status"
X_COORDINATE = "X-coordinate"
Y_COORDINATE = 'Y-coordinate'
MOUNT_TYPE = 'Mounting Type for Solar'
ADDRESS = 'Address'
COUNTRY = 'Country'
REGION = 'Region'

current_link = "https://osuked.github.io/Power-Station-Dictionary/attribute_sources/renewable-energy-planning-database/renewable-energy-planning-database-q2-june-2021.csv"

class QuerySolarFarmDetail:

    def __init__(self, link):
        self.__df_attrs = pd.read_csv(link, encoding= 'latin1')
        self.__query_wind_farms()
        self.__query_essential_data([OPERATOR, SITENAME, DEVELOPMENT_STATUS, MOUNT_TYPE, X_COORDINATE, Y_COORDINATE, ADDRESS, REGION, COUNTRY])
        self.__create_lat_long_from_bng()
    
    def __query_wind_farms(self):
        self.__df_attrs = self.__df_attrs[self.__df_attrs['Technology Type'].isin(['Solar Photovoltaics'])]

    def __query_essential_data(self, list_of_columns):
        self.__df_attrs = self.__df_attrs[list_of_columns]
    
    def __create_lat_long_from_bng(self):
        long_lst = []
        lat_lst = []
        transformer = pyproj.Transformer.from_crs(crs_british, crs_wgs84)
        for row in self.__df_attrs.itertuples():
            long, lat = transformer.transform(row[5], row[6])
            long_lst.append(long)
            lat_lst.append(lat)
        self.__df_attrs['Longitude'], self.__df_attrs['Latitude'] = long_lst, lat_lst

    def get_dataframe(self):
        return self.__df_attrs