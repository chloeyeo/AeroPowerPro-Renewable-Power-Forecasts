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


def pull_forecasts_from_api(lat, long, start_date, end_date):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={long}&hourly=temperature_2m,surface_pressure,windspeed_10m,windspeed_80m&windspeed_unit=ms&start_date={start_date}&end_date={end_date}"
    req = requests.get(url=url)
    return req


def split_to_np(data, days=1, time_interval=6):
    # convert to an np array, where each row is a data entry (forecast)
    print(data)
    if days == 5:
        start_time = datetime.now().hour
        end_time = start_time + days * 24
    else:
        start_time = datetime.now().hour + 120
        end_time = start_time + time_interval
    forecasts = np.array([[data["temperature_2m"][start_time:end_time],
                           data["surface_pressure"][start_time:end_time],
                           data["windspeed_10m"][start_time:end_time],
                           data["windspeed_80m"][start_time:end_time],
                           parser.parse(data['time'][start_time:end_time]).replace(tzinfo=pytz.UTC)]])
    return forecasts


@transaction.atomic
def insert_to_weather_forecast(data, lat, long, days=1):
    hourly = data['hourly']
    forecasts = split_to_np(data=hourly, days=days)
    for forecast in forecasts:
        defaults = {"temperature_2m": forecast[0],
                    "surface_pressure": forecast[1],
                    "windspeed_10m": forecast[2],
                    "windspeed_80m": forecast[3],
                    }
        # WeatherForecast.objects.create(date_val = forecast[-1], latitude = lat, longitude = long, temperature_2m = forecast[0],
        #                                 surface_pressure = forecast[1], windspeed_10m = forecast[2], windspeed_80m = forecast[3])
        WeatherForecast.objects.update_or_create(date_val=forecast[-1], latitude=lat, longitude=long, defaults=defaults)


def get_forecasts(lat, long, start_date=datetime.now(), days=5):
    end_date = start_date + relativedelta(days=days)
    start_date = start_date.strftime("%Y-%m-%d")
    end_date = end_date.strftime("%Y-%m-%d")
    count = 0
    pulled = False
    
    while count < 3 and not pulled:
        try :
            req = pull_forecasts_from_api(lat, long, start_date, end_date)
            data = json.loads(req.content)
            insert_to_weather_forecast(data, lat, long)
            print("Here")
            pulled = True
        except:
            print(f"Failed to pull weather forecats for ({lat},{long}), trying again")
            count += 1            
    


def get_forecasts_coord_step(start_date=datetime.now(), days=5, step=0.25):
    print(f"Getting forecasts for the next {days} days")
    for lat in np.arange(50.0, 59.25, step):
        for long in np.arange(-7.0, 3.25, step):
            get_forecasts(lat, long, start_date, days)
            print(f"Power forecasts for ({lat}, {long})")
    print("Done")


# For the first time, the WeatherForecast.objects.all() is empty, we should run the script with 5 days.
# For the other running times, we should only run the script with 6 days and keep the data from time_now+120 to time_now+120+6, to avoid duplication.
if len(WeatherForecast.objects.all()) == 0:
    get_forecasts_coord_step(start_date=datetime.now(), days=5, step=0.25)
else:
    get_forecasts_coord_step(start_date=datetime.now(), days=6, step=0.25)
