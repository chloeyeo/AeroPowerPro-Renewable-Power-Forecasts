SHOW DATABASES;
CREATE DATABASE IF NOT EXISTS sh33;
SHOW DATABASES;

USE sh33;
-- The following tabel is created based the returned fields getting from the Wind Power Restful API.
CREATE TABLE IF NOT EXISTS HISTORIC_WIND(
	geoloc_id int,
    calendar_id int,
    msl int,
    u_comp float(32),
    v_comp float(32),
    FOREIGN KEY (geoloc_id)
		REFERENCES GEOLOC(geoloc_id)
        ON DELETE CASCADE,
        
	FOREIGN KEY (calendar_id)
		REFERENCES CALENDAR(calendar_id)
        ON DELETE CASCADE
);