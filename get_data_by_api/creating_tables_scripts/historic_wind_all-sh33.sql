SHOW DATABASES;
CREATE DATABASE IF NOT EXISTS sh33;
SHOW DATABASES;

USE sh33;
-- The following tabel is created based the returned fields getting from the Wind Power Restful API.
CREATE TABLE IF NOT EXISTS historic_wind_all(
	historic_wind_id INT AUTO_INCREMENT PRIMARY KEY,
    date_val datetime,
    longitude int,
    latitute int,
    msl int,
    u_comp float(16),
    v_comp float(16)
);
