import requests
from urllib import parse

sql_query =  '''SELECT * FROM  "db6c038f-98af-4570-ab60-24d71ebd0ae5" ORDER BY "_id" ASC LIMIT 48'''
params = {'sql': sql_query}

try:
    resposne = requests.get('https://api.nationalgrideso.com/api/3/action/datastore_search_sql', params = parse.urlencode(params))
    data_forcast = resposne.json()["result"]
except requests.exceptions.RequestException as e:
    print(e.response.text)


for data in data_forcast['records']:
    print(data['EMBEDDED_SOLAR_FORECAST'])