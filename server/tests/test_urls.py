import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

import django
django.setup()

from django.urls import reverse, resolve
from backend_db.views import UserView, get_elexon, get_elexon_by_date, GeolocationsView, HistoricWindViewSet, LoginView, RegisterApiView, PowerForecastViewSet, WindFarmDataByArea, GenericWindTurbineViewSet

import unittest

class TestUrls(unittest.TestCase):
    def test_user_profile(self):
        url = reverse('userProfile')
        self.assertEqual(url, '/userProfile/')

        resolver = resolve('/userProfile/')
        self.assertEqual(resolver.func.cls, UserView)

    def test_geolocations(self):
        url = reverse('geolocations')
        self.assertEqual(url, '/geolocations/')

        resolver = resolve('/geolocations/')
        self.assertEqual(resolver.func.cls, GeolocationsView)
    
    def test_historic_wind_data(self):
        url = reverse('historic_wind_data')
        self.assertEqual(url, '/historic_wind_data/')

        resolver = resolve('/historic_wind_data/')
        self.assertEqual(resolver.func.cls, HistoricWindViewSet)
    
    def test_login(self):
        url = reverse('login')
        self.assertEqual(url, '/login/')

        resolver = resolve('/login/')
        self.assertEqual(resolver.func.cls, LoginView)
    
    def test_register(self):
        url = reverse('register')
        self.assertEqual(url, '/register/')

        resolver = resolve('/register/')
        self.assertEqual(resolver.func.cls, RegisterApiView)
    
    def test_get_elexon(self):
        url = reverse('get_elexon')
        self.assertEqual(url, '/get_elexon/')

        # resolver = resolve('/get_elexon/')
        # self.assertEqual(resolver.func.cls, get_elexon)
    
    # def test_get_elexon_by_date(self):
    #     url = reverse('get_elexon_by_date')
    #     self.assertEqual(url, '/get_elexon/<str:date>/')

        # resolver = resolve('/get_elexon/<str:date>/')
        # self.assertEqual(resolver.func.cls, get_elexon_by_date)
    
    def test_generate_power_forecast(self):
        url = reverse('generate_power_forecast')
        self.assertEqual(url, '/generate_power_forecast/')

        resolver = resolve('/generate_power_forecast/')
        self.assertEqual(resolver.func.cls, PowerForecastViewSet)
    
    def test_generic_wind_turbines(self):
        url = reverse('generic_wind_turbines')
        self.assertEqual(url, '/generic_wind_turbines/')

        resolver = resolve('/generic_wind_turbines/')
        self.assertEqual(resolver.func.cls, GenericWindTurbineViewSet)
    
    def test_farm_data_by_area(self):
        url = reverse('farm_data_by_area')
        self.assertEqual(url, '/farm_data_by_area/')

        resolver = resolve('/farm_data_by_area/')
        self.assertEqual(resolver.func.cls, WindFarmDataByArea)
    

if __name__ == '__main__':
    unittest.main()