SHOW DATABASES;
CREATE DATABASE IF NOT EXISTS sh33;
SHOW DATABASES;

USE sh33;
-- The following tabel is created based the returned fields getting from the Wind Power Restful API.
CREATE TABLE IF NOT EXISTS windpower(
	time_series_id TEXT,
    registered_resource_eic_code TEXT,
	bm_unit_id TEXT,
	ngc_bm_unit_id TEXT,
    psr_type TEXT,
	market_generation_unit_eic_code TEXT,
	market_generation_bm_unit_id TEXT,
	market_generation_ngc_bm_unit_id TEXT,
	settlement_date DATE,
	settlement_period INT,
    quantity TEXT
);

SELECT * FROM windpower;

-- insert one piece of data with following command
-- INSERT INTO windpower(time_series_id, registered_resource_eic_code, bm_unit_id, ngc_bm_unit_id, psr_type, market_generation_unit_eic_code, market_generation_bm_unit_id, market_generation_ngc_bm_unit_id, settlement_date, settlement_period, quantity) 
-- VALUES('ELX-EMFIP-AGOG-TS-219', '48W00000GLOFW-15', 'E_GLOFW-1', 'GLOFW-1', 'Generation', '48W00000GLOFW-15', 'E_GLOFW-1', 'GLOFW-1', '2022/1/1',  1, '1.202');
-- SELECT * FROM windpower;

