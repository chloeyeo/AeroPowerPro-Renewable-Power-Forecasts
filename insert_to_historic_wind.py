import pyodbc as db

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
    
    insert_list = [str(time.date()),str(time.time()) , str(msl), str(lat), str(long), str(u_comp), str(v_comp)]
    # print(insert_list)
    insert_sql = "INSERT INTO historic_wind(wind_date, wind_time, u_comp, v_comp, " \
                 "msl, longitude, latitude) "

    insert_list = ['"' + insert_list[i] + '"' for i in range(len(insert_list))]
    cursor.execute(insert_sql + "values (" + ','.join(insert_list) + ");")
    cnxn.commit()

    

