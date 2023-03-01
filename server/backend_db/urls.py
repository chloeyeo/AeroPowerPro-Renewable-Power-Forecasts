from django.urls import path, re_path
from django.contrib import admin
from backend_db.views import UserView, get_elexon, get_elexon_by_date, GeolocationsView, HistoricWindViewSet, LoginView, RegisterApiView, PowerForecastViewSet, WindFarmDataByArea
from backend_db.views import MyObtainTokenPairView
from rest_framework_simplejwt.views import TokenRefreshView
from backend_db.views import GenericWindTurbineViewSet

urlpatterns = [
    path('userProfile/', UserView.as_view(), name='userProfile'),
    path('geolocations/', GeolocationsView.as_view(), name = 'geolocations'),
    path('historic_wind_data/', HistoricWindViewSet.as_view(), name='historic_wind_data'),
    path('get_elexon/', get_elexon, name='get_elexon'),
    path('get_elexon/<str:date>', get_elexon_by_date, name='get_elexon_by_date'),
    path('login/', MyObtainTokenPairView.as_view(), name='login'),
    path('login_refresh/', TokenRefreshView.as_view(), name='login_refresh'),
    path('register/', RegisterApiView.as_view(), name="register"),
    path('generate_power_forecast/', PowerForecastViewSet.as_view(), name = "generate_power_forecast"),
    path('generic_wind_turbines/', GenericWindTurbineViewSet.as_view(), name = "generic_wind_turbines"),
    path('farm_data_by_area/', WindFarmDataByArea.as_view(), name = "farm_data_by_area"),
]