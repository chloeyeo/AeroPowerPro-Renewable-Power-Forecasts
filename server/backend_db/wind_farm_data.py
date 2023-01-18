from django.db import models

class WindFarmData(models.Model):
    windfarm_data_id = models.IntegerField(primary_key = True, unique = True, auto_created = True)
    longitude = models.FloatField(blank = False)
    latitude = models.FloatField(blank = False)
    hub_height = models.IntegerField(default=100, blank = False)
    number_of_turbines = models.IntegerField(blank = True, default = 50)
    turbine_capacity = models.FloatField(blank = True)
    is_onshore = models.BooleanField(default = True, blank = False) # turbine type, onshore/offshore