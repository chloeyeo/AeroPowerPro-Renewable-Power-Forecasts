import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

import django
django.setup()

import unittest
from backend_db.views import *
from django.urls import reverse
from rest_framework.test import APITestCase

class TestSerializers(unittest.TestCase):

    # def test_user_serializer(self):
    #     val_dict = {'email': 'user123@gmail.com', 'password':'123ZW14Abe', 'username': 'user123', 'first_name': 'u__s', 'last_name': 'er_1'} 
    #     serializer = UserSerializer(data=val_dict)
    #     if serializer.is_valid():
    #         return serializer.data # assertion test here....
    #     return serializer.errors

    # def test_login_serializer(self): 
    #     val_dict = {'email': 'user123@gmail.com', 'password':'123ZW14Abe'} 
    #     serializer = LoginSerializer(data=val_dict)
    #     if serializer.is_valid():
    #         return serializer.data # assertion test here....
    #     return serializer.errors
    
    def test_register_serializer(self): 
        val_dict = {'first_name': 'u__s', 'last_name': 'er_1', 'password':'123ZW14Abe'} 
        serializer = RegisterSerializer(data=val_dict)
        if serializer.is_valid():
            return serializer.data # assertion test here....
        return serializer.errors
    
class MyTokenObtainPairSerializerTests(APITestCase):
    def test_my_token_obtain_pair_serializer(self):
        url = reverse('login')
        u = User.objects.create_user(username='test_user', email = 'user@foo.com', password='testpass123!')
        u.is_active = False
        u.save()
        
        # user is not active, hence should not be authenticated
        resp = self.client.post(url, {'email':'user@foo.com', 'password':'testpass123!'}, format = 'json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
        
        # activate user and check that it can be authenticated
        u.is_active = True
        u.save()
        
        resp = self.client.post(url, {'username':'test_user', 'password':'testpass123!'}, format = 'json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertTrue('access' in resp.data)
        self.assertTrue('refresh' in resp.data)
        
        refresh = resp.data['refresh']
        url = reverse('login_refresh')
        resp = self.client.post(url, {'refresh': f'{refresh}'}, format = 'json')
        self.assertTrue('access' in resp.data)
        self.assertFalse(refresh == resp.data['access'])        
        
    # def test_historic_wind_serializer(self): 
    #     val_dict = {'wind_data_id': 12880, 'height_above_ground': 20, 'date_val':'2021-02-08', 'longitude': 1.0, 'latitude': 50.0, 'u_comp': -16.354726791381836, 'v_comp': -5.896159648895264} 
    #     serializer = HistoricWindSerializer(data=val_dict)
    #     if serializer.is_valid():
    #         return serializer.data # assertion test here....
    #     return serializer.errors
    
    # def test_wind_farm_data_serializer(self): 
    #     val_dict = {'longitude': 1.0, 'latitude': 50.0} 
    #     serializer = WindFarmDataSerializer(data=val_dict)
    #     if serializer.is_valid():
    #         return serializer.data # assertion test here....
    #     return serializer.errors