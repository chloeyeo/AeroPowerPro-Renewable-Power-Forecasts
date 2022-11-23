from django.db import models

class WeatherForecast(models.Model):
    forecast_data_id = models.IntegerField(primary_key = True, unique = True, auto_created = True)
    date_val = models.DateTimeField(blank = False)
    longitude = models.FloatField(blank = False)
    latitude = models.FloatField(blank = False)
    temperature_2m = models.FloatField()
    surface_pressure = models.FloatField()
    windspeed_10m = models.FloatField()
    windspeed_80m = models.FloatField()