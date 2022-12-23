import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
import django
django.setup()
from backend_db.models import WeatherForecast
from datetime import datetime
from dateutil import parser
import requests
from dateutil.relativedelta import relativedelta
import pytz
import json
import numpy as np
from django.db import transaction


def pull_forecasts_from_api(lat ,long, start_date, end_date):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={long}&hourly=temperature_2m,surface_pressure,windspeed_10m,windspeed_80m&windspeed_unit=ms&start_date={start_date}&end_date={end_date}"
    req = requests.get(url=url)
    
    return req

def split_to_np(data):
    now = datetime.now().isoformat() # convert to iso, which we receive from API
    # convert to an np array, where each row is a data entry (forecast)
    forecasts = np.array( [ [data["temperature_2m"][count],
                        data["surface_pressure"][count],
                        data["windspeed_10m"][count],
                        data["windspeed_80m"][count],
                        parser.parse(data['time'][count]).replace(tzinfo=pytz.UTC),] 
                        for count in range(len(data['time'])) if data['time'][count] > now] )
    return forecasts

@transaction.atomic
def insert_to_weather_forecast(data, lat, long):
    hourly = data['hourly']

    forecasts = split_to_np(hourly)
    
    for forecast in forecasts:
        defaults = {"temperature_2m" : forecast[0],
                    "surface_pressure" : forecast[1],
                    "windspeed_10m" : forecast[2],
                    "windspeed_80m" : forecast[3],
                    }
        # WeatherForecast.objects.create(date_val = forecast[-1], latitude = lat, longitude = long, temperature_2m = forecast[0],
        #                                 surface_pressure = forecast[1], windspeed_10m = forecast[2], windspeed_80m = forecast[3])
        WeatherForecast.objects.update_or_create(date_val = forecast[-1], latitude = lat, longitude = long, defaults = defaults)
        


def get_forecasts(lat, long, start_date = datetime.now(), days = 5, ):
    
    end_date = start_date + relativedelta(days = days)
    start_date = start_date.strftime("%Y-%m-%d")
    end_date = end_date.strftime("%Y-%m-%d")
    req = pull_forecasts_from_api(lat, long, start_date, end_date)
    if (req.status_code != 200):
        print(req)
    else :
        data = json.loads(req.content)
        insert_to_weather_forecast(data, lat, long)
    

def get_forecasts_coord_step(start_date = datetime.now(), days = 5, step = 0.25):
    print(f"Getting forecasts for the next {days} days")
    for lat in np.arange(50.0, 59.01, step):
        for long in np.arange(-7.0, 3.01, step):
            get_forecasts(lat, long, start_date, days)
            print(f"Power forecasts for ({lat},{long})")
    print("Done")

get_forecasts_coord_step()


