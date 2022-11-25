from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class HistoricWind(models.Model):
    wind_data_id = models.IntegerField(primary_key=True, unique=True, auto_created=True)
    height_above_ground = models.IntegerField(blank=False)
    date_val = models.DateTimeField(blank=False)
    longitude = models.FloatField(blank=False)
    latitude = models.FloatField(blank=False)
    u_comp = models.FloatField(blank=False)
    v_comp = models.FloatField(blank=False)


class ActualProduceElectricity(models.Model):
    data_id = models.IntegerField(primary_key=True, unique=True, auto_created=True)
    time_series_id = models.CharField(max_length=255)
    registed_resource_eic_code = models.CharField(max_length=255)
    bm_unit_id = models.CharField(max_length=255)
    ngc_bm_unit_id = models.CharField(max_length=255)
    psr_type = models.CharField(max_length=255)
    market_generation_unit_eic_code = models.CharField(max_length=255)
    market_generation_bmu_id = models.CharField(max_length=255)
    market_generation_ngc_bmu_id = models.CharField(max_length=255)
    settlement_date = models.DateField()
    period = models.IntegerField()
    quantity = models.FloatField()


class UserProfile(models.Model):
    # user = models.OneToOneField(User, on_delete=models.CASCADE) we don't have this yet

    email = models.CharField(max_length=100, null=True, unique=True)
    password = models.CharField(max_length=64, null=True)
