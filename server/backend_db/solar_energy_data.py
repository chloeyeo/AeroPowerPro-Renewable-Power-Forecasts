from django.db import models

class SolarEnergyData(models.Model):
    id = models.IntegerField(primary_key = True, unique = True, auto_created = True)
    gsp_id = models.IntegerField(blank = False)
    datetime_gmt = models.DateTimeField(blank = False)
    generation_mw = models.FloatField(blank = False)

