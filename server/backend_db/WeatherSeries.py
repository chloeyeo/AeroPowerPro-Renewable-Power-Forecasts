import pandas as pd
from numpy import clip
from backend_db.models import WeatherForecast


def get_closest_coords(long, lat):
    return clip(round(long*4)/4, -7, 3), clip(round(lat*4)/4, 51, 59)


class WeatherSeries():
    
    def __init__(self, longitude, latitude, get_forecasts_on_init = False):
        self.longitude, self.latitude = get_closest_coords(longitude, latitude)

        self.forecasts = None

        if (get_forecasts_on_init):
            self.pull_forecasts()
    
    def pull_forecasts(self):
        weather = WeatherForecast.objects.filter(latitude = self.latitude, longitude = self.longitude).values_list('date_val', 'temperature_2m', 'surface_pressure', 'windspeed_10m', 'windspeed_80m')

        weather_df = pd.DataFrame(weather,
                                    columns = [['variable_name', 'temperature', 'surface_pressure', 'wind_speed', 'wind_speed'],
                                                ['height', 2, 0, 10, 80]],
                                    )
                                    
        weather_df.set_index(('variable_name','height'), inplace=True)

        weather_df[('surface_pressure',0)] = weather_df[('surface_pressure',0)].apply(lambda x : x*100) # convert from hPa to Pa
        weather_df[('temperature',2)] = weather_df[('temperature',2)].apply(lambda x : x + 273.15) # convert to Kelvin
        weather_df[('roughness_length',0)] = 0.15 # roughness level of 0.15 is typical for grassland

        self.forecasts = weather_df

    def get_longitude(self):
        return self.longitude

    def get_latitude(self):
        return self.latitude

    def get_forecasts(self):
        return self.forecasts

    def set_longitude(self, longitude):
        if (isinstance(longitude, (int, float)) and longitude > 0):
            self.longitude = longitude
        else:
            raise TypeError("Longitude should be a numeric value greater than 0")

    def set_latitude(self, latitude):
        if (isinstance(latitude, (int, float)) and latitude > 0):
            self.longitude = latitude
        else:
            raise TypeError("Latitude should be a numeric value greater than 0")