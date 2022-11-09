from django.db import models
from backend_db.ELEXON_models import ActualProduceElectricity
# Create your models here.

class HistoricWind(models.Model):
    wind_data_id = models.IntegerField(primary_key = True, unique = True, auto_created = True)
    height_above_ground = models.IntegerField(blank = False)
    date_val = models.DateTimeField(blank = False)
    longitude = models.IntegerField(blank = False)
    latitute = models.IntegerField(blank = False)
    u_comp = models.FloatField(blank = False)
    v_comp = models.FloatField(blank = False)