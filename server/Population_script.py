import Population_script_NOAA as noaa
import elexon_query as elx
import OpenMeteoAPI as om
from create_farm_data_db import Populate_windfarm_data_refactor as wfarm
from create_farm_data_db import Populate_windfarm_detail_data as dwfarm
import schedule
import time


def schedule_func():
    # iterate and pull data every 6 hours with schedule job
    schedule.every(6).hours.do(noaa.NOAA_schedule_job)
    schedule.every(6).hours.do(elx.elexon_schedule_job)
    schedule.every(6).hours.do(om.get_forecasts_coord_step)
    schedule.every(6).hours.do(wfarm.get_windfarms)
    schedule.every(6).hours.do(dwfarm.main)

    print("The scheduling is done!")

    while True:
        schedule.run_pending()
        time.sleep(21540)       # sleep for 5 hours and 59 minutes before next retrieval

