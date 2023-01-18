from pandas import DataFrame

basic_3000 = {
    'hub_height': 105,  # in m
    'power_curve': DataFrame(
            data={'value': [p * 1000 for p in [
                      0.0, 26.0, 180.0, 1500.0, 3000.0, 3000.0]],  # in W
                  'wind_speed': [0.0, 3.0, 5.0, 10.0, 15.0, 25.0]})  # in m/s
    }