# import os
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
# import django
# django.setup()
from backend_db.models import WeatherForecast
import pandas as pd
from windpowerlib import ModelChain, WindTurbine
from numpy import clip



class Turbine():

    def __init__(self, hub_height, wind_speeds, power_curve, number_of_turbines, model_on_create = False):
        self.hub_height = hub_height
        self.wind_speeds = wind_speeds
        self.power_curve = power_curve
        self.number_of_turbines = number_of_turbines
        self.turbine = None
        self.power_output = None

        # If model_on_create, create the WindTurbine Model on init, cannot change model later
        if (model_on_create):
            self.create_turbine_model()

    def create_turbine_model(self):
        temp_turbine = {
        'hub_height': self.hub_height,
        'power_curve': pd.DataFrame(data = {
                                        'value': self.power_curve,
                                        'wind_speed': self.wind_speeds,
            })
        }
        self.turbine = WindTurbine(**temp_turbine)

    # Run the Forecast Model for the given weather series
    def generate_power_output(self, weather_df):
        self.power_output = ModelChain(self.turbine).run_model(weather_df).power_output * self.number_of_turbines

        # Convert from Series to DataFrame
        self.power_output = self.power_output.to_frame()
        print(self.power_output)


    def set_hub_height(self, hub_height):
        if (isinstance(hub_height, (int, float)) and hub_height > 0):
            self.hub_height = hub_height
        else:
            raise TypeError("Hub height should be a numeric value greater than 0")
    
    def set_wind_speeds(self, wind_speeds):
        if all(isinstance(item, (int,float)) for item in wind_speeds):
            self.wind_speeds = wind_speeds
        else:
            raise TypeError("Wind Speeds should be a list of numeric values")

    def set_power_curve(self, power_curve):
        if all(isinstance(item, (int,float)) for item in power_curve):
            self.power_curve = power_curve
        else:
            raise TypeError("Power Curve should be a list of numeric values")


    def set_number_of_turbines(self, number_of_turbines):
        if (isinstance(number_of_turbines, (int, float))):
            self.number_of_turbines = number_of_turbines
        else:
            raise TypeError("The number of turbines should be a numeric value greater than 0")


    def get_hub_height(self):
        return self.hub_height

    def get_wind_speeds(self):
        return self.wind_speeds
    
    def get_power_curve(self):
        return self.power_curve

    def get_number_of_turbines(self):
        return self.number_of_turbines

    def get_power_output(self):
        return self.power_output