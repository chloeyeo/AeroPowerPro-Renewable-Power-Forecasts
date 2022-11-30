import time
import datetime
import pytz
from dateutil.relativedelta import relativedelta
import pandas as pd
import schedule

from elexon_query import get_data_by_restful, elexon_schedule_job
from Population_script_NOAA import NOAA_schedule_job, NOAA_get_historic


if __name__ == "__main__":
    # 1. get the data of two years ago
    # 1.1 for elexon
    today = datetime.datetime.now()
    start_time = today.replace(tzinfo=pytz.UTC)      # set datetime format to non-ambiguous, standard UTC
    end_time = today - relativedelta(years=2)        # Start getting data from 2 years ago

    frame = pd.date_range(start=str(start_time.date()), end=str(end_time.date()))
    for i in range(len(frame)):
        date = str(frame[i]).split(" ")[0]
        year, month, day = date.split("-")
        print(f"Inserting Data to Database for Current Date: {str(year) + '-' + str(month).zfill(2) + '-' + str(day).zfill(2)}")
        get_data_by_restful(settlementDate=year + '-' + month.zfill(2) + '-' + day.zfill(2), period="*")

    # 1.2 for NOAA
    NOAA_get_historic(start_time, end_time)

    # 2. create periodic task and do it every 6 hours starting from this script started running
    schedule.every(6).hours.do(elexon_schedule_job)
    schedule.every(6).hours.do(NOAA_schedule_job)
    while True:
        schedule.run_pending()
        time.sleep(21300)       # sleep for 5 hours and 55 minutes before next retrieval
