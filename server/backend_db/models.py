from django.db import models
from backend_db.elexon_model import ActualProduceElectricity
from django.contrib.auth.models import User
# Create your models here.

class HistoricWind(models.Model):
    wind_data_id = models.IntegerField(primary_key = True, unique = True, auto_created = True)
    height_above_ground = models.IntegerField(blank = False)
    date_val = models.DateTimeField(blank = False)
    longitude = models.FloatField(blank = False)
    latitude = models.FloatField(blank = False)
    u_comp = models.FloatField(blank = False)
    v_comp = models.FloatField(blank = False)

class UserProfile(models.Model):
    # user = models.OneToOneField(User, on_delete=models.CASCADE) we don't have this yet

    email = models.CharField(max_length=100, null=True, unique=True)
    password = models.CharField(max_length=64, null=True)
