from windpowerlib import WindTurbine
from windpowerlib import data as wt
import numpy as np
from pprint import pprint
from collections import ChainMap

def create_turbine(turbine_type):
    turbine = {
            'turbine_type': turbine_type,  # turbine type as in oedb turbine library
            'hub_height' : 100, # set because it needs it to create the turbine obj
        }

    return WindTurbine(**turbine)

def create_turbine_dict(turbine_type):
    turbine = {
            'turbine_type': turbine_type,  # turbine type as in oedb turbine library
            'hub_height' : 100, # set because it needs it to create the turbine obj
        }
    turbine = WindTurbine(**turbine)
    power_curve = turbine.power_curve
    turbine_dict = {}
    turbine_dict[turbine.turbine_type] = {
        'power_curve' : [list(pair) for pair in zip(list(power_curve['wind_speed']), list(power_curve['value']/1000))], 
    }
    return turbine_dict

def get_all_generic_turbines():
    # DataFrame of known turbines and if they have power curves or not
    df = wt.get_turbine_types(print_out=False)

    # Convert to format expected by Frontend
    turbines = np.vectorize(create_turbine_dict)(df.turbine_type[df.has_power_curve])
    return dict(ChainMap(*turbines))