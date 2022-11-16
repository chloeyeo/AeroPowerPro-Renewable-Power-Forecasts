# This file is used to connect and operate MySQL database

import pyodbc

# 1. connection and setting
# Specifying the ODBC driver, server name, database, etc. directly
connection_string = (
    'DRIVER=MySQL ODBC 8.0 ANSI Driver;'
    'SERVER=localhost;'
    'DATABASE=mydb;'
    'UID=root;'
    'PWD=mypassword;'
    'charset=utf8mb4;'
)
cnxn = pyodbc.connect(connection_string)

# Using a DSN, but providing a password as well
# cnxn = pyodbc.connect('DSN=test;PWD=password')

# Create a cursor from the connection
cursor = cnxn.cursor()

# set the encoding or decoding settings needed for your database
cnxn.setdecoding(pyodbc.SQL_WCHAR, encoding='utf-8')
cnxn.setencoding(encoding='utf-8')

# 2. selection
cursor.execute("select user_id, user_name from users")
rows = cursor.fetchall()
for row in rows:
    print(row.user_id, row.user_name)

# 3. inserting
cursor.execute("INSERT INTO table_name(fild1, fild2) values ('', '')")
cnxn.commit()

# 4. updating
cursor.execute("UPDATE table_name SET fild1='', fild2='' WHERE id <> ?", 'pyodbc')
print(cursor.rowcount, ' rows updated')
cnxn.commit()


# 5. deleting
cursor.execute("DELETE FROM table_name WHERE id <>?", 'pyodbc')
print(cursor.rowcount, ' rows deleted')
cnxn.commit()



