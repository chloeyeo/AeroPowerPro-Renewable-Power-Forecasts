import pandas as pd
from numpy import clip
from backend_db.models import WeatherForecast
from django.utils import timezone

def get_closest_coords(long, lat):
    return clip(round(long*4)/4, -7, 3), clip(round(lat*4)/4, 51, 59)


class WeatherSeries():
    
    def __init__(self, longitude : float, latitude : float, get_forecasts_on_init : bool = False):
        self.longitude, self.latitude = get_closest_coords(longitude, latitude)

        self.forecasts = None

        if (get_forecasts_on_init):
            self.pull_forecasts()
    
    def pull_forecasts(self):
        now = timezone.now()
        # get relevant weather data. Approprate lat, long and time greater than now (futere forecasts only)
        weather = WeatherForecast.objects.filter(latitude = self.latitude, longitude = self.longitude, date_val__gte=now).values_list('date_val', 'temperature_2m', 'surface_pressure', 'windspeed_10m', 'windspeed_80m')

        weather_df = pd.DataFrame(weather,
                                    columns = [['variable_name', 'temperature', 'surface_pressure', 'wind_speed', 'wind_speed'],
                                                ['height', 2, 0, 10, 80]],
                                    )
                                    
        weather_df.set_index(('variable_name','height'), inplace=True)

        weather_df[('surface_pressure',0)] = weather_df[('surface_pressure',0)].apply(lambda x : x*100) # convert from hPa to Pa
        weather_df[('temperature',2)] = weather_df[('temperature',2)].apply(lambda x : x + 273.15) # convert to Kelvin
        weather_df[('roughness_length',0)] = 0.15 # roughness level of 0.15 is typical for grassland

        self.forecasts = weather_df
    
    
    def check_is_numeric(self, item: float):
        return isinstance(item , (int, float))
    
    
    @property
    def longitude(self) -> float:
        return self._longitude

    @property
    def latitude(self) -> float:
        return self._latitude

    @property
    def forecasts(self) -> pd.DataFrame:
        return self._forecasts


    @longitude.setter
    def longitude(self, longitude):
        if (self.check_is_numeric(longitude) and longitude > 0):
            self._longitude = longitude
        else:
            raise TypeError("Longitude should be a numeric value greater than 0")

    @latitude.setter
    def latitude(self, latitude):
        if (self.check_is_numeric(latitude) and latitude > 0):
            self._latitude = latitude
        else:
            raise TypeError("Latitude should be a numeric value greater than 0")
        
    @forecasts.setter
    def forecasts(self, forecasts):
        self._forecasts = forecasts
        