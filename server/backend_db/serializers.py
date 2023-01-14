from rest_framework.serializers import ModelSerializer

from .models import UserProfile, HistoricWind, WindFarmData

class UserSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('email', 'password', 'username', 'first_name', 'last_name')

class HistoricWindSerializer(ModelSerializer):
    class Meta:
        model = HistoricWind
        fields = ('wind_data_id', 'height_above_ground', 'date_val', 'longitude', 'latitude', 'u_comp', 'v_comp')

class WindFarmDataSerializer(ModelSerializer):
    class Meta:
        model = WindFarmData
        fields = ('longitude', 'latitude')