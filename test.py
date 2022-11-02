import requests
# import json
import ast
import pyodbc as db

head = {"token" : "moshOOUPsFoAVABwgZSRgmmewnJQjkfb"}
req = requests.get(
    "https://www.ncei.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&units=standard&startdate=2021-05-01T00:00:00&enddate=2022-05-01T00:00:00&datatypeid=AWND&limit=100",
    headers = head)


print(req.status_code)

content = req.content.decode(req.encoding)
c = ast.literal_eval(content)

con_str = (
    'DRIVER=MySQL ODBC 8.0 ANSI Driver;'
    'SERVER=localhost;'
    'DATABASE=localhost;'
    'UID=root;'
    'PWD=;'
    'charset=utf8mb4;'
)

cnxn = db.connect(con_str)

# print(type(c))




