from django.contrib import admin
from backend_db.models import HistoricWind, ActualProduceElectricity, UserProfile

# Register models with the admin interface here

admin.site.register(HistoricWind)

admin.site.register(ActualProduceElectricity)

admin.site.register(UserProfile)
