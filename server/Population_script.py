import Population_script_NOAA as noaa
import elexon_query as elx
import OpenMeteoAPI as om
from create_farm_data_db import Populate_windfarm_data_refactor as wfarm

noaa.main()
elx.main()
om.get_forecasts_coord_step()
wfarm.get_windfarms()