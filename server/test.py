from windpowerlib import WindTurbine
from windpowerlib import data as wt
import numpy as np
from pprint import pprint

def create_turbine(turbine_type):
    turbine = {
            'turbine_type': turbine_type,  # turbine type as in oedb turbine library
            'hub_height' : 100,
        }

    return WindTurbine(**turbine)

def create_turbine_dict(turbine):
    power_curve = turbine.power_curve
    turbine_dict = {}
    turbine_dict[turbine.turbine_type] = {
        'power_curve' : [list(pair) for pair in zip(list(power_curve['wind_speed']), list(power_curve['value']/1000))], 

    }
    return turbine_dict

df = wt.get_turbine_types(print_out=False)

turbine_types = np.array(df.turbine_type)
has_power_curve = np.array(df.has_power_curve)

turbines = np.vectorize(create_turbine)(turbine_types[has_power_curve])

# print(list(turbines[0].power_curve.value))
turbine_types = np.vectorize(create_turbine_dict)(turbines)
# turbines = np.vectorice()(turbines)
pprint(turbine_types[0])