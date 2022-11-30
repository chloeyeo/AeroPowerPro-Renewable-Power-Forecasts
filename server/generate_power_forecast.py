import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
import django
django.setup()
from backend_db.models import WeatherForecast, ActualProduceElectricity
import pandas as pd
from windpowerlib import ModelChain, WindTurbine, create_power_curve
import numpy as np

turbines = ActualProduceElectricity.objects.values_list('market_generation_ngc_bmu_id', flat=True).distinct()
weather = WeatherForecast.objects.filter(latitude = 50.00, longitude = -2.0).values_list('date_val', 'temperature_2m', 'surface_pressure', 'windspeed_10m', 'windspeed_80m')
# print(weather)
weather_df = pd.DataFrame(weather,
                            columns = [['variable_name', 'temperature', 'surface_pressure', 'wind_speed', 'wind_speed'],
                                        ['height', 2, 0, 10, 80]],
                            )
                            
weather_df.set_index(('variable_name','height'), inplace=True)
# weather_df[['roughness_length'],[0]] = 0.15
# weather_df.reindex(weather_df.columns.tolist() + ['roughness_length'], axis = 1)
weather_df[('surface_pressure',0)] = weather_df[('surface_pressure',0)].apply(lambda x : x*100) # convert from hPa to Pa
weather_df[('temperature',2)] = weather_df[('temperature',2)].apply(lambda x : x + 273.15) # convert to Kelvin
weather_df[('roughness_length',0)] = 0.15
# print(weather_df.head)

for turbine in turbines:
    new_tb = {'turbine_type': 'E-126/4200', 'hub_height': 100}
    new_tb = WindTurbine(**new_tb)
    # print(turbine)
    mc_new_tb = ModelChain(new_tb).run_model(weather_df)
    print(mc_new_tb.power_output)
    break
    
