import unittest
from backend_db.views import *

class TestSerializers(unittest.TestCase):

    def test_user_serializer(self): 
        val_dict = {'email': 'user123@gmail.com', 'password':'123ZW14Abe', 'username': 'user123', 'first_name': 'u__s', 'last_name': 'er_1'} 
        serializer = UserSerializer(data=val_dict)
        if serializer.is_valid():
            return serializer.data # assertion test here....
        return serializer.errors

    def test_login_serializer(self): 
        val_dict = {'email': 'user123@gmail.com', 'password':'123ZW14Abe'} 
        serializer = LoginSerializer(data=val_dict)
        if serializer.is_valid():
            return serializer.data # assertion test here....
        return serializer.errors
    
    def test_register_serializer(self): 
        val_dict = {'first_name': 'u__s', 'last_name': 'er_1', 'password':'123ZW14Abe'} 
        serializer = RegisterSerializer(data=val_dict)
        if serializer.is_valid():
            return serializer.data # assertion test here....
        return serializer.errors
    
    def test_historic_wind_serializer(self): 
        val_dict = {'wind_data_id': 12880, 'height_above_ground': 20, 'date_val':'2021-02-08', 'longitude': 1.0, 'latitude': 50.0, 'u_comp': -16.354726791381836, 'v_comp': -5.896159648895264} 
        serializer = HistoricWindSerializer(data=val_dict)
        if serializer.is_valid():
            return serializer.data # assertion test here....
        return serializer.errors
    
    def test_wind_farm_data_serializer(self): 
        val_dict = {'longitude': 1.0, 'latitude': 50.0} 
        serializer = WindFarmDataSerializer(data=val_dict)
        if serializer.is_valid():
            return serializer.data # assertion test here....
        return serializer.errors