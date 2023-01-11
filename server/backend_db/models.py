from django.db import models
from backend_db.elexon_model import ActualProduceElectricity
from backend_db.open_meteo_model import WeatherForecast
from backend_db.power_forecast import PowerForecast
from django.contrib.auth.models import User
from backend_db.wind_farm_metadata import WindFarmData
# Create your models here.


class HistoricWind(models.Model):
    wind_data_id = models.IntegerField(primary_key = True, unique = True, auto_created = True)
    height_above_ground = models.IntegerField(blank = False)
    date_val = models.DateTimeField(blank = False)
    longitude = models.FloatField(blank = False)
    latitude = models.FloatField(blank = False)
    u_comp = models.FloatField(blank = False)
    v_comp = models.FloatField(blank = False)

    def __str__(self):
        return "{} : ({},{}) : u_comp = {}, v_comp = {}".format(self.date_val.strftime("%Y-%m-%d"), self.latitude, self.longitude, self.u_comp, self.v_comp)


class UserProfile(models.Model):
    # user = models.OneToOneField(User, on_delete=models.CASCADE) we don't have this yet

    email = models.CharField(max_length=100, null=True, unique=True)
    password = models.CharField(max_length=64, null=True)
