from django.contrib import admin
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import Permission
from django.contrib.admin.models import LogEntry
from backend_db.models import HistoricWind, ActualProduceElectricity, WeatherForecast, PowerForecast, UserProfile, WindFarmData, WindFarmDetailData
# Register your models here.

admin.site.register(HistoricWind)

admin.site.register(ActualProduceElectricity)

admin.site.register(WeatherForecast)

admin.site.register(PowerForecast)

admin.site.register(UserProfile)

admin.site.register(WindFarmData)

admin.site.register(WindFarmDetailData)

