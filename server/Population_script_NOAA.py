import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                      'server.settings')
import django
django.setup()
from backend_db.models import HistoricWind
import datetime

import requests
import netCDF4 as nc
from dateutil.relativedelta import relativedelta
import numpy as np

def split_date(dat):
    year = dat.strftime("%Y")
    month = dat.strftime("%m")
    day = dat.strftime('%d')
    hour = dat.strftime("%H")
    minutes = dat.strftime("%M")

    return year, month, day, hour, minutes

def split_net(link):
    vals = list(link.variables.values())
    lats = np.array(vals[1])
    heights = np.array(vals[2])
    time = np.array(vals[3])
    longs = np.array(vals[4])
    u_comp = np.array(vals[5])
    v_comp = np.array(vals[6])

    return u_comp, time, heights, lats, longs, v_comp


def historic_wind_pull(dat):
    year, month, day, hour, minutes = split_date(dat)
    url = f"https://www.ncei.noaa.gov/thredds/ncss/grid/model-gfs-004-files/{year}{month}/{year}{month}{day}/gfs_3_{year}{month}{day}_{hour}{minutes}_000.grb2?var=u-component_of_wind_height_above_ground&var=v-component_of_wind_height_above_ground&north=59&west=-3&east=4&south=50&horizStride=1&time_start={year}-{month}-{day}T{hour}:{minutes}:00Z&time_end={year}-{month}-{day}T{hour}:{minutes}:00Z&timeStride=1&&accept=netcdf3"
    return requests.get(url=url)


def historic_wind_insert(link, dat):
    u_comp, time, heights, lats, longs, v_comp = split_net(link)

    for h in range(len(time)):
        insert_h = dat + relativedelta(hours = time[h])
        for height in range(len(heights)):
            for lat in range(len(lats)):
                for lon in range(len(longs)):
                    insert_u = u_comp[h][height][lat][lon]
                    insert_v = v_comp[h][height][lat][lon]
                    new_historic_wind = HistoricWind.objects.get_or_create(date_val = insert_h, 
                                                                            height_above_ground = heights[height], 
                                                                            latitute = lats[lat], 
                                                                            longitude = longs[lon], 
                                                                            u_comp = insert_u, 
                                                                            v_comp = insert_v)[0]
                    new_historic_wind.save()


def historic_wind_pull_insert(dat):
    req = historic_wind_pull(dat)

    if (req.status_code == 200):
        data = req.content
        link = nc.Dataset('anynamehere', memory = data)
        historic_wind_insert(link, dat)
    else:
        print("Request Failed: ", req)


def get_historic_wind_all():
    today = datetime.datetime.now()
    dat = today - relativedelta(years=2)
    dat = dat.replace(hour = 00, minute = 00, second = 0, microsecond= 0)

    # Starting from 2 years ago, iterate and pull data every 6 hours
    while (dat < today):
        historic_wind_pull_insert(dat)
        print(dat, "finished")
        dat = dat + relativedelta(hours = 6) # skip 6 hours ahead
    print("Done!") 

get_historic_wind_all()