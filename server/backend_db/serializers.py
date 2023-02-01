from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import UserProfile, HistoricWind, WindFarmData
from django.contrib.auth import authenticate
from rest_framework import serializers

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password', 'username', 'first_name', 'last_name')

class HistoricWindSerializer(ModelSerializer):
    class Meta:
        model = HistoricWind
        fields = ('wind_data_id', 'height_above_ground', 'date_val', 'longitude', 'latitude', 'u_comp', 'v_comp')

class WindFarmDataSerializer(ModelSerializer):
    class Meta:
        model = WindFarmData
        fields = ('longitude', 'latitude')


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField( label = 'email',
                                    write_only = True
                                    )

    password = serializers.CharField(   label = 'password',
                                        style = {'input_type' : 'password'},
                                        trim_whitespace = False,
                                        write_only = True,
                                        )
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate (   request = self.context.get('request'),
                                    email = email, password = password)

            if not user:
                msg = 'Access denied: wrong username or password.'
                raise serializers.ValidationError(msg, code = 'authorization')
        else:
            msg = 'Both "username" and "password" are required.'
            raise serializers.ValidationError(msg, code='authorization')
        
        attrs['user'] = user
        return attrs

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        max_length = 64, min_length = 5, write_only=True,
    )

    first_name = serializers.CharField(
        max_length = 64,
        allow_blank = True,
        required = False,
    )

    last_name = serializers.CharField(
        max_length = 64,
        allow_blank = True,
        required = False,
    )

    class Meta():
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name')

    def create(self, validated_data):
        print("\n\n\n\n\n")
        new_user = User.objects.create_user(**validated_data)
        new_user.first_name = validated_data['first_name']
        new_user.last_name = validated_data['last_name']
        new_user.save()
        # print(f'asd{new_user}','\n\n\n')
        return new_user