from django.contrib import admin
from backend_db.models import HistoricWind, ActualProduceElectricity, WeatherForecast, PowerForecast, UserProfile, WindFarmData, WindFarmDetailData, SolarEnergyData, SolarFarmDetailData
# Register your models here.

admin.site.register(HistoricWind)

admin.site.register(ActualProduceElectricity)

admin.site.register(WeatherForecast)

admin.site.register(PowerForecast)

admin.site.register(UserProfile)

admin.site.register(WindFarmData)

admin.site.register(WindFarmDetailData)

admin.site.register(SolarEnergyData)

admin.site.register(SolarFarmDetailData)