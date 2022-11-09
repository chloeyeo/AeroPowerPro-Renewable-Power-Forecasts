import requests
import datetime
from dateutil.relativedelta import relativedelta
import netCDF4 as nc
import numpy as np


dat = datetime.datetime.now()
dat = dat - relativedelta(years=1)
dat  = dat.replace(hour=0, minute=0, second=0, microsecond=0)
year = dat.strftime("%Y")
month = dat.strftime("%m")
day = dat.strftime('%d')
hour = dat.strftime("%H")
minutes = dat.strftime("%M")

print(dat)

url = f"https://www.ncei.noaa.gov/thredds/ncss/grid/model-gfs-004-files/{year}{month}/{year}{month}{day}/gfs_3_{year}{month}{day}_{hour}{minutes}_000.grb2?var=u-component_of_wind_height_above_ground&var=v-component_of_wind_height_above_ground&north=59&west=-3&east=4&south=50&horizStride=1&time_start={year}-{month}-{day}T{hour}:{minutes}:00Z&time_end={year}-{month}-{day}T{hour}:{minutes}:00Z&timeStride=1&&accept=netcdf3"

req = requests.get(url)
if (req.status_code == 200):
    data = req.content
    link = nc.Dataset('anynamehere', memory = data)
    vals = np.array(list(link.variables.values()))
    print(vals[8])
else:
    print("Request Failed: ", req)
