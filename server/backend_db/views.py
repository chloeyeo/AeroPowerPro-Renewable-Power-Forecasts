from django.shortcuts import render
# from django.http import HttpResponse
# from django.urls import reverse
# from django.contrib.auth import authenticate, login, logout
from backend_db.models import ActualProduceElectricity, UserProfile, HistoricWind, WindFarmData
from django.http import JsonResponse
from rest_framework.mixins import (
    CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin
)
from rest_framework.viewsets import GenericViewSet
from .serializers import UserSerializer, HistoricWindSerializer, WindFarmDataSerializer
# from rest_framework.decorators import api_view
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from .Wind_Turbine_Model.generic_wind_turbines_from_lib import get_all_generic_turbines
import numpy as np
from .Turbine import Turbine
from .WeatherSeries import WeatherSeries

class PowerForecastViewSet(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format = None):
        hub_height = self.request.data['hubHeight']
        longitude = self.request.data['longitude']
        latitude = self.request.data['latitude']
        number_of_turbines = self.request.data['numOfTurbines']

        #table data is given as array of tuples(formated as arrays), 1st col is wind_speeds and 2nd is power_curve 
        wind_speeds, power_curve = np.array(request.data['tableData']).T

        weather = WeatherSeries(longitude, latitude, get_forecasts_on_init = True)
        weather_df = weather.get_forecasts()
        
        wind_turbine = Turbine(hub_height, wind_speeds, power_curve * 1000, number_of_turbines, model_on_create=True)
        wind_turbine.generate_power_output(weather_df)
        
        power_output = wind_turbine.get_power_output()
        response = {}

        # convert power forecast into a 2d Array of datetime, power_output
        response['power_forecast'] = [list(pair) for pair in zip(list(power_output.index) , list(power_output['feedin_power_plant'] / 1000))]
        return JsonResponse(response, safe = False)

class GenericWindTurbineViewSet(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, reqeust, format = None):
        # Convert to a dictionary of values to allow for Json response

        generic_turbines = get_all_generic_turbines()

        return JsonResponse(generic_turbines, safe = False)


class HistoricWindViewSet(APIView):

    permission_classes = [permissions.AllowAny]

    def get(self, request, format = None):
        historic_wind_data = HistoricWind.objects.all().values_list('longitude', 'latitude')

        return JsonResponse(list(historic_wind_data), safe = False)



class UserView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format = None):
        user = UserProfile( username = self.request.data['username'],
                            email = self.request.data['email'],
                            password = self.request.data['password'],
                            first_name = self.request.data['first_name'],
                            last_name = self.request.data['last_name'])

        user.save()
        return Response(request.data['username'])


class GeolocationsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format = None):
        wind_farms = WindFarmData.objects.all().values_list('windfarm_data_id',
                                                            'longitude',
                                                            'latitude',
                                                            'hub_height',
                                                            'number_of_turbines',
                                                            'turbine_capacity',
                                                            'is_onshore',)
        
        return JsonResponse(list(wind_farms), safe = False)

class WindFarmDataByArea(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format = None):
        max_lat, max_long = request.data['max_latitude'], request.data['max_longitude']
        min_lat, min_long = request.data['min_latitude'], request.data['min_longitude']
        response = {}
        
        wind_farms = WindFarmData.object.filter(latitude__gte=min_lat,
                                                latitude__lte=max_lat,
                                                longitude__gte=min_long,
                                                longitude__lte=max_long)

        response['wind_farms'] = {}
        response['total_turbines'] = 0
        response['total_turbine_capacity'] = 0
        response['average_hub_height'] = []
        # response['total_power_output'] = []
        # datetimes = None
        average_hub_height = []
        # power_forecasts = []
        for farm in wind_farms:
            longitude = farm.longitude
            latitude = farm.latitude
            hub_height = farm.hub_height
            number_of_turbines = farm.number_of_turbines
            turbine_capacity = farm.turbine_capacity
            farm_id = farm.windfarm_data_id

            response['wind_farms'][farm_id] = {   'longitude' : longitude,
                                                                'latitude' : latitude,
                                                                'hub_height' : hub_height,
                                                                'number_of_turbines' : number_of_turbines,
                                                                'turbine_capacity' : turbine_capacity,
                                                                'is_onshore' : farm.is_onshore,}
            response['total_turbines'] += number_of_turbines
            response['total_turbine_capacity'] += farm.turbine_capacity
            response['average_hub_height'].append(hub_height)
            # weather = WeatherSeries(longitude, latitude, get_forecasts_on_init = True)
            # weather_df = weather.get_forecasts()

            ## NEED TO GET WIND POWER CURVE FOR TURBINE FROM REQUEST
            # wind_turbine = Turbine(hub_height, wind_speeds, power_curve * 1000, number_of_turbines, model_on_create=True)
            # wind_turbine.generate_power_output(weather_df)
            
            # power_output = wind_turbine.get_power_output()
            # datetimes = list(power_output.index)
            # power_output = [list(pair) for pair in zip(list(power_output.index) , list(power_output['feedin_power_plant'] / 1000))]
            
            # response[farm_id]['power_forecast'] = power_output
            # power_forecasts.append( np.array(power_output)[:,1])
        
        # There were farms in the selected area
        # if datetimes != None:
        # Add the forecasts all up
            # total_power_forecast = np.sum(power_forecasts, axis = 0)
            # response['total_power_forecast'] = [list(pair) for pair in zip (datetimes ,list(total_power_forecast))]
        response['average_hub_height'] = np.sum(response['average_hub_height'])/len(average_hub_height)
        
        return JsonResponse(response, safe = False)




# from rest_framework.views import APIView
# from rest_framework.request import Request
# from rest_framework.response import Response
# import {Login} from '../../src/pages/login'


# I checked how to solve the problem the for login page. The problem is in both front end and back end.
# 1. First, the server is running in port 3000, so you should send request to http://127.0.0.1:3000 but not 8000.
# 2. Second, the backend of RegisterView should be a function but not a Class.

# @api_view['POST']
def register_view(request):
    if request.method == "POST":
    #     email = request.data.get("email")
    #     password = request.data.get("password")
    #     user = authenticate(email=email, password=password)
    #     print("asdsadasd")
    #     if user:
    #         login(request, user)
    #         return {'status': 0}
    #     else:
    #         print(f"Invalid email or password: email: {email}, password: {password}")
    # else:
    #     return render(request, 'login/')
        return JsonResponse({"status" : "ok I guess"})

# def login_view(request):
#     if request.method == "POST":
#         email = request.data.get("email")
#         password = request.data.get("password")
#         user = authenticate(email=email, password=password)
#         if user:
#             login(request, user)
#             return {'status': 0}
#         else:
#             print(f"Invalid email or password: email: {email}, password: {password}")
#     else:
#         return render(request, 'login/')


def get_elexon(request):
    context_dic = {}
    try:
        elexon_data = ActualProduceElectricity.objects.all()
        context_dic = {'elexon_data': elexon_data}
        return render(request, 'show_elexon/', context=context_dic)
    except ActualProduceElectricity.DoesNotExist:
        print(f"The ActualProduceElectricity is not exist")
        return render(request, 'get_elexon/', context=context_dic)


def get_elexon_by_date(request, date):
    context_dic = {}
    try:
        elexon_data = ActualProduceElectricity.objects.get(settlement_date=date)
        context_dic = {'elexon_data': elexon_data}
        return render(request, 'show_elexon/', context=context_dic)
    except ActualProduceElectricity.DoesNotExist:
        print(f"The ActualProduceElectricity is not exist")
        return render(request, 'get_elexon/', context=context_dic)




# validate password and email
# import urllib library
# from urllib.request import urlopen
  
# # import json
# import json

# # store the URL in url as 
# # parameter for urlopen
# url = "http://localhost:8000/postrequest"
  
# # store the response of URL
# response = urlopen(url)
  
# # storing the JSON response 
# # from url in data
# data_json = json.loads(response.read())
# # Create your views here.
# def register_user(request):
#     try:
#         registered = False
#         # store the URL in url as 
#         # parameter for urlopen
#         url = "http://localhost:8000/postrequest"

#         # store the response of URL
#         response = urlopen(url)
    
#         # storing the JSON response 
#         # from url in data
#         data_json = json.loads(response.read())
#         return data_json
    
#     # try:
#     #     # tells whether registration was successful
#     #     registered = False
#     #     # get data = request from login.js using fetch post
#     #     # password = request.GET.get("password")
#     #     # request is json object

#     #     return JsonResponse(data)
#     except:
#         data = {'registered': False, 'password':'', 'email': ''}
#         return JsonResponse(data)
