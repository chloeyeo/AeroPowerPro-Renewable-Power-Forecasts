from django.contrib import admin
from backend_db.models import HistoricWind, ActualProduceElectricity, WeatherForecast
# Register your models here.

admin.site.register(HistoricWind)

admin.site.register(ActualProduceElectricity)

admin.site.register(WeatherForecast)