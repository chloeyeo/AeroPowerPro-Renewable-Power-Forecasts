import requests
from netCDF4 import Dataset
url = "https://www.ncei.noaa.gov/thredds/ncss/model-gfs-004-files/202209/20220930/gfs_3_20220930_1800_000.grb2?var=u-component_of_wind_altitude_above_msl&var=v-component_of_wind_altitude_above_msl&north=59&west=-7&east=3&south=-50&disableProjSubset=on&horizStride=1&time_start=2022-09-30T18%3A00%3A00Z&time_end=2022-09-30T18%3A00%3A00Z&timeStride=1&vertCoord=#mode=bytes"
link = Dataset(url)
# response = requests.get(url)
# decoded_content = response.content.decode('utf-8')
print(link)