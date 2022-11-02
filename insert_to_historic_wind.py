import pyodbc as db

def insert_historic_wind(time, msl, lat, long, u_comp, v_comp):
    pwd = "Pow3rRootPas5!"
    con_str = (
        'DRIVER=MySQL ODBC 8.0 ANSI Driver;'
        'SERVER=localhost;'
        'DATABASE=localhost;'
        'UID=root;'
        f'PWD={pwd};'
        'charset=utf8mb4;'
    )

    cnxn = db.connect(con_str)
    cnxn.setdecoding(db.SQL_WCHAR, encoding='utf-8')
    cnxn.setencoding(encoding='utf-8')

    


