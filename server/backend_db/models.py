from django.db import models
from ELEXON_models import ActualProduceElectricity
# Create your models here.

class HistoricWind(models.Model):
    wind_data_id = models.IntegerField(primary_key = True, auto_created = True)
    msl = models.IntegerField()
    date_val = models.DateTimeField()
    longitude = models.IntegerField()
    latitute = models.IntegerField()
    u_comp = models.FloatField()