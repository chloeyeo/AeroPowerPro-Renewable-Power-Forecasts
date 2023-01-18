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
from generate_power_forecast import generate_power_forecast
from .Wind_Turbine_Model.siemens_2300KW import E_28_2300
# @api_view(['GET', 'POST'])
# class UserViewSet(  GenericViewSet,  # generic view functionality
#                      CreateModelMixin,  # handles POSTs
#                      RetrieveModelMixin,  # handles GETs for 1 Company
#                      UpdateModelMixin,  # handles PUTs and PATCHes
#                      ListModelMixin): # handles GETs for many Companies
#     permission_classes = [permissions.AllowAny]
#     serializer_class = UserSerializer
#     queryset = UserProfile.objects.all()

class PowerForecastViewSet(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format = None):
        power_curve = self.request.data['power']
        wind_speeds = self.requests.data['wind_speed']
        hub_height = self.request.data['hub_height']
        longitude = self.request.data['longitude']
        latitude = self.request.data['latitude']
        number_of_turbines = self.request.data['number_of_turbines']
        power_output = generate_power_forecast( latitude = latitude,
                                                longitude= longitude,
                                                power_curve = power_curve,
                                                wind_speeds = wind_speeds,
                                                hub_height = hub_height,
                                                number_of_turbines = number_of_turbines)

        return JsonResponse(power_output.to_json(orient = 'records', lines = True))

class GenericWindTurbineViewSet(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, reqeust, format = None):
        # Convert to a dictionary of values to allow for Json response
        generic_turbine = {}
        generic_turbine['E_28_2300'] = {}

        generic_turbine['E_28_2300']['hub_height'] = E_28_2300['hub_height']
        generic_turbine['E_28_2300']['power_curve'] = E_28_2300['power_curve']['value']
        generic_turbine['E_28_2300']['wind_speed'] = E_28_2300['power_curve']['wind_speed']

        return JsonResponse(list(generic_turbine), safe=False)

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
        wind_farms = WindFarmData.objects.all().values_list('longitude', 'latitude')
        print("HELLO")
        print(wind_farms)
        
        return JsonResponse(list(wind_farms), safe = False)


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
