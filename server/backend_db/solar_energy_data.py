from django.db import models

OPERATOR = 'Operator (or Applicant)'
SITENAME = 'Site Name'
DEVELOPMENT_STATUS = "Development Status"
X_COORDINATE = "X-coordinate"
Y_COORDINATE = 'Y-coordinate'
ADDRESS = 'Address'
COUNTRY = 'Country'
REGION = 'Region'

class SolarEnergyData(models.Model):
    id = models.IntegerField(primary_key = True, unique = True, auto_created = True)
    gsp_id = models.IntegerField(blank = False)
    datetime_gmt = models.DateTimeField(blank = False)
    generation_mw = models.FloatField(blank = False)

class SolarFarmDetailData(models.Model):
    id = models.IntegerField(primary_key = True, unique = True, auto_created = True)
    operator = models.CharField(null = True, max_length=200)
    sitename = models.CharField(null = True, max_length=200)
    development_status = models.CharField(null = True, max_length=200)
    mounting_type_for_solar = models.CharField(null = True, max_length=200)
    x_coordinate = models.FloatField(null = True, blank = True)
    y_coordinate = models.FloatField(null = True, blank = True)
    address = models.CharField(null = True, max_length=200)
    region = models.CharField(null = True, max_length=200)
    country = models.CharField(null = True, max_length=200)
    longitude = models.FloatField(null = True, blank = True)
    latitude = models.FloatField(null = True, blank = True)

class GSPLocation(models.Model):
    gsp_id = models.IntegerField(blank = False, null = True)
    gsp_name = models.CharField(null = True, max_length=200)
    gsp_lat = models.FloatField(null = True, blank = True)
    gsp_lon = models.FloatField(null = True, blank = True)
