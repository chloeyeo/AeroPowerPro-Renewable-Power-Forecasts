from datetime import datetime, timedelta
import pytz
from dateutil import parser

from pvforecast_api import PVForecast

pvf = PVForecast(user_id="495", api_key="02e111f6c2aee9a2169a0b10c7a16207af8a6580") # Enter your user_id and api_key here!
start = datetime.now(pytz.utc)\

start = start.replace(hour = 0, minute= 0, second= 0, microsecond= 0)

start = start - timedelta()
end = start + timedelta(days = 3)
base_time_list = pvf.get_forecast_bases(start, end).pop()
print(base_time_list)
yourdate = parser.parse(base_time_list)
lastest_base_time = yourdate.strftime('%H:%M')
# print(pvf.latest(entity_type="gsp", entity_id=152, dataframe=True))
print(pvf.get_forecasts(start,end, forecast_base_times = [lastest_base_time], entity_type = 'gsp', entity_id = 0, dataframe=True))