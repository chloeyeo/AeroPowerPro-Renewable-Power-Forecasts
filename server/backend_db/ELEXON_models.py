from django.db import models

class ActualProduceElectricity(models.Model):
    data_id = models.IntegerField(primary_key = True, unique = True, auto_created = True)
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