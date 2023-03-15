from django.urls import path
from backend_db.views import get_elexon, get_elexon_by_date, GeolocationsView, HistoricWindViewSet, RegisterApiView, PowerForecastViewSet, WindFarmDataByArea, SolarFarmGeolocationView, HistoricSolarViewSet, SolarHistoricData
from backend_db.views import MyObtainTokenPairView
from rest_framework_simplejwt.views import TokenRefreshView
from backend_db.views import GenericWindTurbineViewSet

urlpatterns = [
    path('geolocations/', GeolocationsView.as_view(), name = 'geolocations'),
    path('solar_farm_geolocation_view/', SolarFarmGeolocationView.as_view(), name = 'solar_farm_geolocation_view'),
    path('historic_wind_data/', HistoricWindViewSet.as_view(), name = 'historic_wind_data'),
    path('historic_solar_data/', HistoricSolarViewSet.as_view(), name= 'historic_solar_data'),
    path('get_elexon/', get_elexon, name='get_elexon'),
    path('get_elexon/<str:date>', get_elexon_by_date, name='get_elexon_by_date'),
    path('login/', MyObtainTokenPairView.as_view(), name='login'),
    path('login_refresh/', TokenRefreshView.as_view(), name='login_refresh'),
    path('register/', RegisterApiView.as_view(), name="register"),
    path('generate_power_forecast/', PowerForecastViewSet.as_view(), name = "generate_power_forecast"),
    path('generic_wind_turbines/', GenericWindTurbineViewSet.as_view(), name = "generic_wind_turbines"),
    path('farm_data_by_area/', WindFarmDataByArea.as_view(), name = "farm_data_by_area"),
    path('historic_solar_data/', SolarHistoricData.as_view(), name = 'historic_solar_data'),
]