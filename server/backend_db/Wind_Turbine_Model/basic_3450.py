from numpy import arange
from pandas import DataFrame

# basic_3450 = {'wind_speed' : [i for i in arange(0.0, 22.6, 0.5)], # in m/s
# 'power' : [ p * 1000 
#             for p in ([0,0,0,0,0,0,35,101,184,283,404,550,725,932,1172,1446,1760,2104,2482,2865,3187,3366,3433,3448] + [3450]*22)], # in W
#             'hub_height' : 100, 
#  }


basic_3450 = {
    'hub_height': 100,
    'power_curve': DataFrame(data = {
                    'value':[ p * 1000 for p in ([0,0,0,0,0,0,35,101,184,283,404,550,725,932,1172,1446,1760,2104,2482,2865,3187,3366,3433,3448] + [3450]*22)], # in W
                    'wind_speed': [i for i in arange(0.0, 22.6, 0.5)], # in m/s
    })
}