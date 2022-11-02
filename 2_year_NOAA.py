import requests
import netCDF4 as nc
import datetime
from dateutil.relativedelta import relativedelta
import numpy as np
from insert_to_historic_wind import insert_historic_wind

today = datetime.datetime.today() 
dat = datetime.datetime.today()
dat = dat - relativedelta(years=1)

def get_historic_wind_all():
    
    dat = datetime.datetime.today()
    dat = dat - relativedelta(years=2)
    dat = dat.replace(hour = 00, minute = 00, microsecond = 0)
    minutes = dat.strftime("%M")

    while (dat < today):
        year = dat.strftime("%Y")
        month = dat.strftime("%m")
        day = dat.strftime('%d')
        hour = dat.strftime("%H")
        url = f"https://www.ncei.noaa.gov/thredds/ncss/model-gfs-004-files/{year}{month}/{year}{month}{day}/gfs_3_{year}{month}{day}_{hour}{minutes}_000.grb2?var=u-component_of_wind_altitude_above_msl&var=v-component_of_wind_altitude_above_msl&north=59&west=-7&east=3&south=-50&disableProjSubset=on&horizStride=1&time_start={year}-{month}-{day}T{minutes}%3A00%3A00Z&time_end=2022-09-30T18%3A00%3A00Z&timeStride=1&vertCoord="
        req = requests.get(url=url)
        if (req.status_code == 200):
            data = req.content
            link = nc.Dataset('anynamehere', memory = data)

            vals = list(link.variables.values())
            u_comp = np.array(vals[0])
            time = np.array(vals[1])
            alt_msl = np.array(vals[2])
            lats = np.array(vals[3])
            longs = np.array(vals[4])
            v_comp = np.array(vals[-1])

            for h in range(len(time)):
                for msl in range(len(alt_msl)):
                    for lat in range(len(lats)):
                        for lon in range(len(longs)):
                            insert_h = dat + relativedelta(hours = time[h])
                            insert_u = u_comp[h][msl][lat][lon]
                            insert_v = v_comp[h][msl][lat][lon]
                            insert_historic_wind(time = insert_h, msl = alt_msl[msl], lat = lats[lat], long = longs[lon], u_comp = insert_u, v_comp = insert_v)
            print("ASD")
            # print(dat)
        else:
            print(req)
        # break
        dat = dat + relativedelta(hours = 6)
    print("Done!")

get_historic_wind_all()