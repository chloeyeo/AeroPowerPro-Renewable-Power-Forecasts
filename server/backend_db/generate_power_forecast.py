# from ast import MatchAs
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
import django
django.setup()
from backend_db.models import WeatherForecast
import pandas as pd
from windpowerlib import ModelChain, WindTurbine

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

# # print(weather_df)
# # for turbine in turbines:
# #     print(turbine)
# # print(weather_df.head)
# # new_tb = {'turbine_type': 'E-126/4200', 'hub_height': 100}
# # new_tb = WindTurbine(**new_tb)
# # print(new_tb.power_curve)
# # print(turbine)
# # mc_new_tb = ModelChain(new_tb).run_model(weather_df)
# # break

# wind_speed = [i for i in np.arange(0.0, 22.6, 0.5)] # in m/s
# power = [ p * 1000 for p in ([0,0,0,0,0,0,35,101,184,283,404,550,725,932,1172,1446,1760,2104,2482,2865,3187,3366,3433,3448] + [3450]*22)] #in W
# # pprint(mc_new_tb.power_output)
# my_turbine = {
#     'hub_height': 100,
#     'power_curve': pd.DataFrame(data = {
#                                     'value': power,
#                                     'wind_speed':wind_speed,
#     })
# }
# my_turbine = WindTurbine(**my_turbine)
    
# mc_new_tb = ModelChain(my_turbine).run_model(weather_df)
# print(mc_new_tb.power_output)
# print(my_turbine.power_curve)


def generate_power_forecast(latitude, longitude, power_curve, wind_speeds, hub_height, number_of_turbines):
    weather = WeatherForecast.objects.filter(latitude = latitude, longitude = longitude).values_list('date_val', 'temperature_2m', 'surface_pressure', 'windspeed_10m', 'windspeed_80m')

    weather_df = pd.DataFrame(weather,
                                columns = [['variable_name', 'temperature', 'surface_pressure', 'wind_speed', 'wind_speed'],
                                            ['height', 2, 0, 10, 80]],
                                )
                                
    weather_df.set_index(('variable_name','height'), inplace=True)

    weather_df[('surface_pressure',0)] = weather_df[('surface_pressure',0)].apply(lambda x : x*100) # convert from hPa to Pa
    weather_df[('temperature',2)] = weather_df[('temperature',2)].apply(lambda x : x + 273.15) # convert to Kelvin
    weather_df[('roughness_length',0)] = 0.15 # roughness level of 0.15 is typical for grassland

    turbine = {
        'hub_height': hub_height,
        'power_curve': pd.DataFrame(data = {
                                        'value': power_curve,
                                        'wind_speed':wind_speeds,
        })
    }

    turbine = WindTurbine(**turbine)
    return ModelChain(turbine).run_model(weather_df) * number_of_turbines



