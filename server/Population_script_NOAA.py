import os
import time

import schedule

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

import django
django.setup()
from backend_db.models import HistoricWind
import datetime
import pytz
import requests
import netCDF4 as nc
from dateutil.relativedelta import relativedelta
from django.db import transaction


#Split date into its components used by the NOAA Call
def split_date(dat):
    year = dat.strftime("%Y")
    month = dat.strftime("%m")
    day = dat.strftime("%d")
    hour = dat.strftime("%H")
    minutes = dat.strftime("%M")

    return year, month, day, hour, minutes


#Split NOAA request into the data needed
def split_net(link):
    lats = link.variables['latitude']
    heights = link.variables['height_above_ground1']
    time = link.variables['time'][:]
    longs = link.variables['longitude']
    u_comp = link.variables['u-component_of_wind_height_above_ground']
    v_comp = link.variables['v-component_of_wind_height_above_ground']

    return u_comp, time, heights, lats, longs, v_comp


def pull_from_api(dat):
    year, month, day, hour, minutes = split_date(dat)
    url = f"https://www.ncei.noaa.gov/thredds/ncss/grid/model-gfs-004-files/{year}{month}/{year}{month}{day}/gfs_3_{year}{month}{day}_{hour}{minutes}_000.grb2?var=u-component_of_wind_height_above_ground&var=v-component_of_wind_height_above_ground&north=59&west=-7&east=3&south=50&horizStride=1&time_start={year}-{month}-{day}T{hour}:{minutes}:00Z&time_end={year}-{month}-{day}T{hour}:{minutes}:00Z&timeStride=1&&accept=netcdf3"
    return requests.get(url=url)


@transaction.atomic
def historic_wind_insert(link, dat):
    u_comp, time, heights, lats, longs, v_comp = split_net(link)

    for h in range(len(time)):
        insert_h = dat + relativedelta(hours=time[h])
        for height in range(len(heights)):
            for lat in range(len(lats)):
                for lon in range(len(longs)):
                    insert_u = u_comp[h][height][lat][lon]
                    insert_v = v_comp[h][height][lat][lon]
                    HistoricWind.objects.create(date_val=insert_h,
                                                height_above_ground=heights[height],
                                                latitude=lats[lat],
                                                longitude=longs[lon],
                                                u_comp=insert_u,
                                                v_comp=insert_v)


def historic_wind_pull_insert(dat):
    req = pull_from_api(dat)

    if req.status_code == 200:
        data = req.content
        link = nc.Dataset('anynamehere', memory=data)
        historic_wind_insert(link, dat)
        return 1, req.status_code
    else:
        return 0, req


def NOAA_get_historic(start, end):
    # Replace with 0s so that request url can be formated correctly
    start = start.replace(hour=00, minute=00, second=0, microsecond=0, tzinfo=pytz.UTC)
    while start < end:
        success = historic_wind_pull_insert(start)
        if success[0] == 1:
            print(start, "finished")
        else:
            print(start, " failed: ", success[1])
        start = start + relativedelta(hours=6)      # skip 6 hours ahead
    print("Done!")


def NOAA_schedule_job():
    today = datetime.datetime.now()
    end_time = today.replace(tzinfo=pytz.UTC)  # set datetime format to non-ambiguous, standard UTC
    start_time = end_time - relativedelta(hours=6)  # Start getting data from 2 years ago
    NOAA_get_historic(start_time, end_time)


if __name__ == '__main__':
    today = datetime.datetime.now()
    start_time = today.replace(tzinfo=pytz.UTC)      # set datetime format to non-ambiguous, standard UTC
    end_time = start_time - relativedelta(years=2)        # Start getting data from 2 years ago

    # Retrieve data starting from 2 years ago
    NOAA_get_historic(start_time, end_time)

    # iterate and pull data every 6 hours with schedule job
    schedule.every(6).hours.do(NOAA_schedule_job)
    while True:
        schedule.run_pending()
        time.sleep(21300)       # sleep for 5 hours and 55 minutes before next retrieval
