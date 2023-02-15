import Population_script_NOAA as noaa
import elexon_query as elx
import OpenMeteoAPI as om
from create_farm_data_db import Populate_windfarm_data_refactor as wfarm
from create_farm_data_db import Populate_windfarm_detail_data as dwfarm
import schedule
import time


om.get_forecasts_coord_step()
wfarm.get_windfarms()
dwfarm.main()
print("done")

# iterate and pull data every 6 hours with schedule job
schedule.every(6).hours.do(noaa.NOAA_schedule_job)
schedule.every(6).hours.do(elx.elexon_schedule_job)
schedule.every(6).hours.do()
schedule.every(6).hours.do()
schedule.every(6).hours.do()

while True:
    schedule.run_pending()
    time.sleep(21300)       # sleep for 5 hours and 55 minutes before next retrieval

