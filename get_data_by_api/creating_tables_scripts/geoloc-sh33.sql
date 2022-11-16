SHOW DATABASES;
CREATE DATABASE IF NOT EXISTS sh33;
SHOW DATABASES;

USE sh33;
-- The following tabel is created based the returned fields getting from the Wind Power Restful API.
CREATE TABLE IF NOT EXISTS GEOLOC(
	geoloc_id INT AUTO_INCREMENT,
    longitude int,
    latitude int,
    PRIMARY KEY(geoloc_id)
);