from django.db import models

class WindFarmData(models.Model):
    windfarm_data_id = models.IntegerField(primary_key = True, unique = True, auto_created = True)
    longitude = models.FloatField(blank = False)
    latitude = models.FloatField(blank = False)
    hub_height = models.IntegerField(default=100, blank = False)
    number_of_turbines = models.IntegerField(blank = True, default = 0)
    turbine_capacity = models.FloatField(blank = True)
    is_onshore = models.BooleanField(default = True, blank = False) # turbine type, onshore/offshore

class WindFarmDetailData(models.Model):
    id = models.IntegerField(primary_key = True, unique = True, auto_created = True)
    operator = models.CharField(null = True, max_length=200)
    sitename = models.CharField(null = True, max_length=200)
    is_onshore = models.BooleanField(default = True, blank = False) # turbine type, onshore/offshore
    turbine_height = models.FloatField(null = True, blank = True)
    number_of_turbines = models.IntegerField(null = True, blank = True)
    turbine_capacity = models.FloatField(null = True, blank = True)#
    development_status = models.CharField(null = True, max_length=200)
    x_coordinate = models.FloatField(null = True, blank = True)
    y_coordinate = models.FloatField(null = True, blank = True)
    longitude = models.FloatField(null = True, blank = True)
    latitude = models.FloatField(null = True, blank = True)