from django.db import models

class PowerForecast(models.Model):
    power_forecast_id = models.IntegerField(primary_key = True, unique = True, auto_created = True)
    date_val = models.DateTimeField(blank = False)
    longitude = models.FloatField(blank = False)
    latitude = models.FloatField(blank = False)
    power_forecast = models.FloatField(blank = False, null= True)