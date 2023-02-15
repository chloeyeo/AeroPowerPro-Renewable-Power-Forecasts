from django.contrib import admin
from backend_db.models import ActualProduceElectricity
import backend_db.models
# Register your models here.



admin.site.register(ActualProduceElectricity)

admin.site.register(backend_db.models.HistoricWind)

admin.site.register(backend_db.models.WeatherForecast)

admin.site.register(backend_db.models.PowerForecast)

admin.site.register(backend_db.models.WindFarmData)

admin.site.register(backend_db.models.WindFarmDetailData)

