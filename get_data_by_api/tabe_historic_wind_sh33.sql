historic_windSHOW DATABASES;
CREATE DATABASE IF NOT EXISTS sh33;
SHOW DATABASES;

USE sh33;
-- The following tabel is created based the returned fields getting from the Wind Power Restful API.
CREATE TABLE IF NOT EXISTS historic_wind(
	historic_wind_id INT AUTO_INCREMENT PRIMARY KEY,
    wind_date date,
	wind_time time,
    u_comp float(32),
    v_comp float(32),
    msl float(32),
    longitude int,
    latitude int
);

-- SELECT * FROM historic_windwind_data;