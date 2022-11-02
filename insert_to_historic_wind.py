import pyodbc as db
import numpy as np
import datetime
from dateutil.relativedelta import relativedelta

values_str = "values ("

def get_geoloc_id(cursor, long, lat):
    lat = int(lat)
    long = int(long)
    geoloc_select_sql = f"SELECT IFNULL ((SELECT geoloc_id FROM GEOLOC WHERE longitude = {long} AND latitude = {lat} LIMIT 1), NULL);"
    cursor.execute(geoloc_select_sql)
    geoloc_id = cursor.fetchval()
    if(geoloc_id == None):
        geoloc_insert_sql = "INSERT INTO GEOLOC(longitude, latitude) "
        geoloc_insert_list = [str(long), str(lat)]
        geoloc_insert_list = ['"' + geoloc_insert_list[i] + '"' for i in range(len(geoloc_insert_list))]
        cursor.execute(geoloc_insert_sql + values_str + ','.join(geoloc_insert_list) + ");")
        cursor.commit()
        geoloc_id = cursor.execute(f"SELECT geoloc_id FROM GEOLOC WHERE longitude = {long} AND latitude = {lat} LIMIT 1;").fetchval()
        
    return geoloc_id

def get_calendar_id(cursor, dat):
    date = dat.date().strftime("%Y-%M-%d")
    time = dat.time().strftime("%H:%M:00")
    calendar_select_sql = f"SELECT IFNULL ((SELECT calendar_id FROM CALENDAR WHERE calendar_date = '{date}' AND calendar_time = '{time}' LIMIT 1), NULL);"
    cursor.execute(calendar_select_sql)
    calendar_id = cursor.fetchval()

    if (calendar_id == None):
        calendar_insert_sql = "INSERT INTO CALENDAR(calendar_date, calendar_time) "
        calendar_insert = [date, time]
        calendar_insert_list = ['"' + calendar_insert[i] + '"' for i in range(len(calendar_insert))]
        cursor.execute(calendar_insert_sql + values_str + ','.join(calendar_insert_list) + ");")
        calendar_id = cursor.execute(f"SELECT calendar_id FROM CALENDAR WHERE calendar_date = '{date}' AND calendar_time = '{time}' LIMIT 1;").fetchval()
        cursor.commit()

    return calendar_id


def insert_historic_wind(time, msl, lat, long, u_comp, v_comp):
    pwd = "Pow3rRootPas5!"
    con_str = (
        'DRIVER=MySQL ODBC 8.0 ANSI Driver;'
        'SERVER=localhost;'
        'DATABASE=sh33;'
        'UID=root;'
        f'PWD={pwd};'
        'charset=utf8mb4;'
    )

    cnxn = db.connect(con_str)
    cnxn.setdecoding(db.SQL_WCHAR, encoding='utf-8')
    cnxn.setencoding(encoding='utf-8')

    cursor = cnxn.cursor()
    geoloc_id = get_geoloc_id(cursor, long, lat)
    calendar_id = get_calendar_id(cursor, time)

    insert_list = [geoloc_id, calendar_id, msl, u_comp, v_comp]
    insert_sql = "INSERT INTO historic_wind(geoloc_id, calendar_id, msl, u_comp, v_comp) "

    insert_list = ['"' + str(insert_list[i]) + '"' for i in range(len(insert_list))]
    cursor.execute(insert_sql + values_str + ','.join(insert_list) + ");")
    cnxn.commit()

    

