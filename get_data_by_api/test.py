import pandas as pd
from datetime import datetime

frame = pd.date_range(start="2018-09-09",end="2022-02-02")
for i in range(len(frame)):
    date = str(frame[i]).split(" ")[0]
    year, month, day = date.split("-")
    print(year, month, day )