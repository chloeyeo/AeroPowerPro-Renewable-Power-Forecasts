# from ast import MatchAs
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
import django
django.setup()
from backend_db.models import WeatherForecast, ActualProduceElectricity,  WindFarmData
import pandas as pd
from windpowerlib import ModelChain, WindTurbine, create_power_curve, TurbineClusterModelChain, WindTurbineCluster, WindFarm
import numpy as np
from pprint import pprint
from query_turbine_data.open_csv_data import OpenCsvData
from query_turbine_data.wind_turbine_query import QueryWindTurbineData
from Wind_Turbine_Model.basic_3450 import basic_3450

def get_closest_coords(long, lat):
    return np.clip(round(long*4)/4, -7, 3), np.clip(round(lat*4)/4, 51, 59)

# turbines = ActualProduceElectricity.objects.values_list('market_generation_ngc_bmu_id', flat=True).distinct()
# weather = WeatherForecast.objects.filter(latitude = 50.00, longitude = -2.0).values_list('date_val', 'temperature_2m', 'surface_pressure', 'windspeed_10m', 'windspeed_80m')
# # print(weather)
# weather_df = pd.DataFrame(weather,
#                             columns = [['variable_name', 'temperature', 'surface_pressure', 'wind_speed', 'wind_speed'],
#                                         ['height', 2, 0, 10, 80]],
#                             )
                            
# weather_df.set_index(('variable_name','height'), inplace=True)

# weather_df[('surface_pressure',0)] = weather_df[('surface_pressure',0)].apply(lambda x : x*100) # convert from hPa to Pa
# weather_df[('temperature',2)] = weather_df[('temperature',2)].apply(lambda x : x + 273.15) # convert to Kelvin
# weather_df[('roughness_length',0)] = 0.15


# wind_speed = [i for i in np.arange(0.0, 22.6, 0.5)] # in m/s
# power = [ p * 1000 for p in ([0,0,0,0,0,0,35,101,184,283,404,550,725,932,1172,1446,1760,2104,2482,2865,3187,3366,3433,3448] + [3450]*22)] #in W
# pprint(mc_new_tb.power_output)
# my_turbine_fleet = {
#     'hub_height': 100,
#     'power_curve': pd.DataFrame(data = {
#                                     'value': power,
#                                     'wind_speed': wind_speed,
#     })
# }
my_turbine = WindTurbine(**basic_3450)
    
# mc_new_tb = ModelChain(my_turbine).run_model(weather_df)
# print(mc_new_tb.power_output)
# print(my_turbine.power_curve)

wind_farms = WindFarmData.objects.all()#.values_list('longitude', 'latitude', 'hub_height', 'number_of_turbines', 'turbine_capacity')

for farm in wind_farms:
    long, lat = get_closest_coords(farm.longitude, farm.latitude)
    # my_turbine_fleet = {}
    # my_turbine_fleet['hub_height'] = farm.hub_height
    # my_turbine_fleet['wind_turbine'] = WindTurbine(**basic_3450)
    # my_turbine_fleet['total_capacity'] = farm.turbine_capacity
    # my_turbine_fleet['number_of_turbines'] = farm.number_of_turbines
    # my_turbine_fleet = pd.DataFrame(
    #     {'wind_turbine' : [WindTurbine(**basic_3450)],
    #     'number_of_turbines' : [farm.number_of_turbines],
    #     'total_capacity': [farm.turbine_capacity],
    #     }
    # )
    weather = WeatherForecast.objects.filter(latitude = lat, longitude = long).values_list('date_val', 'temperature_2m', 'surface_pressure', 'windspeed_10m', 'windspeed_80m')
    weather_df = pd.DataFrame(  weather, 
                                columns = [['variable_name', 'temperature', 'surface_pressure', 'wind_speed', 'wind_speed'],
                                            ['height', 2, 0, 10, 80]],
                            )
                                
    weather_df.set_index(('variable_name','height'), inplace=True)

    weather_df[('surface_pressure',0)] = weather_df[('surface_pressure',0)].apply(lambda x : x*100) # convert from hPa to Pa
    weather_df[('temperature',2)] = weather_df[('temperature',2)].apply(lambda x : x + 273.15) # convert to Kelvin
    weather_df[('roughness_length',0)] = 0.15

    my_new_tb = ModelChain(my_turbine).run_model(weather_df)
    pprint(my_new_tb.power_output * farm.number_of_turbines)
    # farm = {'name' : 'production farm', 
    #                 'wind_turbine_fleet': my_turbine_fleet,
    #                 'efficiency': 1,
    #                 'wind_speed' : }
    # cluster_data = {
    #     'name' : 'cluster',
    #     'wind_farms' : []
    # }

    # my_turbine_fleet = {
    #     'name' : 'cluster',
    #     'wind_turbine_fleet' : [WindTurbine(**basic_3450).to_group(number_turbines = farm.number_of_turbines)],
    #     'efficiency' : 1.0,
    # }

    # # cluster = WindTurbineCluster(**cluster_data)
    # wind_farm = WindFarm(**my_turbine_fleet )
    # wind_farm_cluster_data = {
    #                             'name' : 'cluster',
    #                             'wind_farms' : [wind_farm],
    # }
    # wind_farm_cluster = WindTurbineCluster(**wind_farm_cluster_data)
    # print(TurbineClusterModelChain(wind_farm_cluster).run_model(weather_df).power_output)
    # my_turbine['power_curve'].wind_speed = WeatherForecast.objects.get()


