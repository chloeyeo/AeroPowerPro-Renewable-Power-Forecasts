import Population_script_NOAA as noaa
import elexon_query as elx
import OpenMeteoAPI as om
from create_farm_data_db import Populate_windfarm_data_refactor as wfarm
from create_farm_data_db import Populate_windfarm_detail_data as dwfarm
import create_solar_data_db.Populate_gsp_location as gsp
import create_solar_data_db.Populate_solar_farm as sfarm
import create_solar_data_db.Populate_solar_energy as senergy
import sys


def run_time_sensitive_scripts():
    """_summary_
        Calls APIs which need to update database based on newer values as they are updated (NOAA, ELEXON, OPEN METEO)
    """
    print("-"*25)
    print("Starting NOAA job")
    noaa.NOAA_schedule_job()
    print("-"*25)
    print("Starting Elexon job")
    elx.elexon_schedule_job()
    print("-"*25)
    print("Starting Open Meteo Job")
    om.get_forecasts_coord_step()
    print("-"*25)
    print("Starting Solar energy job")
    senergy.main()

def run_scripts_once():
    """_summary_
        Calls APIs which need to only be run once to populate the database
    """
    print("-"*25)
    print("Starting small set wind farms job")
    wfarm.get_windfarms()
    print("-"*25)
    print("Starting large wind farm set job")
    dwfarm.main()
    print("-"*25)
    print("Starting GSP Locations job")
    gsp.main()
    print("-"*25)
    print("Starting solar farm job")
    sfarm.main()
    

if __name__ == "__main__":
    """_summary_
        Runs the scripts which populate the database
        
        Include -s as a command line arguement to also run the scripts that only need to be run once (e.g. Wind Farm Data)
    """    
    args = sys.argv[1:]
    if '-s' in args:
        run_scripts_once()
        
    run_time_sensitive_scripts()
    

