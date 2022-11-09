from django.db import models
import ELEXON_models
# Create your models here.

class historic_wind(models.Model):
    wind_data_id = models.IntegerField(primary_key = True, auto_create = True)
    msl = models.IntegerField()
    date_val = models.DateTimeField()
    longitude = models.IntegerField()
    latitute = models.IntegerField(),
    u_comp = models.FloatField()
