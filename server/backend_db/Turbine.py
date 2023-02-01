import pandas as pd
from windpowerlib import ModelChain, WindTurbine
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
        
        
    def check_is_numberic(self, value):
        return isinstance(value, (int, float))

    @property
    def hub_height(self):
        return self._hub_height

    @property
    def wind_speeds(self):
        return self._wind_speeds
    
    @property
    def power_curve(self):
        return self._power_curve

    @property
    def number_of_turbines(self):
        return self._number_of_turbines

    @property
    def power_output(self):
        return self._power_output


    @hub_height.setter
    def hub_height(self, hub_height):
        if (self.check_is_numberic(hub_height) and hub_height > 0):
            self._hub_height = hub_height
        else:
            raise TypeError("Hub height should be a numeric value greater than 0")
    
    @wind_speeds.setter
    def wind_speeds(self, wind_speeds):
        if all(self.check_is_numeric(item) for item in wind_speeds):
            self._wind_speeds = wind_speeds
        else:
            raise TypeError("Wind Speeds should be a list of numeric values")

    @power_curve.setter
    def power_curve(self, power_curve):
        if all(self.check_is_numberic(item) for item in power_curve):
            self._power_curve = power_curve
        else:
            raise TypeError("Power Curve should be a list of numeric values")

    @number_of_turbines.setter
    def number_of_turbines(self, number_of_turbines):
        if (self.check_is_numberic(number_of_turbines)):
            self._number_of_turbines = number_of_turbines
        else:
            raise TypeError("The number of turbines should be a numeric value greater than 0")