-- CREATE TABLE AQI_2020 (
-- 	State_Name VARCHAR(255),
-- 	county_name VARCHAR(255),
-- 	State_Code INT NOT NULL,
-- 	County_Code INT NOT NULL,
-- 	Date DATE NOT NULL,
-- 	AQI INT NOT NULL,
-- 	Category VARCHAR(255),
-- 	Defining_Parameter VARCHAR(255),
-- 	Defining_Site VARCHAR(255),
-- 	Number_of_Sites_Reporting INT NOT NULL);
	

-- CREATE TABLE AQI_2015 (
-- 	State_Name VARCHAR(255),
-- 	county_name VARCHAR(255),
-- 	State_Code INT NOT NULL,
-- 	County_Code INT NOT NULL,
-- 	Date DATE NOT NULL,
-- 	AQI INT NOT NULL,
-- 	Category VARCHAR(255),
-- 	Defining_Parameter VARCHAR(255),
-- 	Defining_Site VARCHAR(255),
-- 	Number_of_Sites_Reporting INT NOT NULL);


-- CREATE TABLE us_state_abbr (
--  	State VARCHAR(255),
-- 	Abbreviation VARCHAR(255)
-- );

-- select * from us_state_abbr;

-- select * from us_county_coordinates;

-- INSERT INTO us_state_abbr (state, abbreviation)
-- values ('Alabama','AL'),
-- ('Alaska','AK'),
-- ('Arizona','AZ'),
-- ('Arkansas','AR'),
-- ('California','CA'),
-- ('Colorado','CO'),
-- ('Connecticut','CT'),
-- ('Delaware','DE'),
-- ('District of Columbia','DC'),
-- ('Florida','FL'),
-- ('Georgia',	'GA'),
-- ('Hawaii','HI'),
-- ('Idaho','ID'),
-- ('Illinois','IL'),
-- ('Indiana',	'IN'),
-- ('Iowa','IA'),
-- ('Kansas','KS'),
-- ('Kentucky','KY'),
-- ('Louisiana','LA'),
-- ('Maine','ME'),
-- ('Montana','MT'),
-- ('Nebraska','NE'),
-- ('Nevada','NV'),
-- ('New Hampshire','NH'),
-- ('New Jersey','NJ'),
-- ('New Mexico','NM'),
-- ('New York','NY'),
-- ('North Carolina','NC'),
-- ('North Dakota','ND'),
-- ('Ohio','OH'),
-- ('Oklahoma','OK'),
-- ('Oregon', 'OR'),
-- ('Maryland','MD'),
-- ('Massachusetts','MA'),
-- ('Michigan','MI'),
-- ('Minnesota','MN'),
-- ('Mississippi','MS'),
-- ('Missouri','MO'),
-- ('Pennsylvania','PA'),
-- ('Rhode Island','RI'),
-- ('South Carolina','SC'),
-- ('South Dakota','SD'),
-- ('Tennessee','TN'),
-- ('Texas','TX'),
-- ('Utah','UT'),
-- ('Vermont','VT'),
-- ('Virginia','VA'),
-- ('Washington','WA'),
-- ('West Virginia','WV'),
-- ('Wisconsin','WI'),
-- ('Wyoming','WY');



-- ALTER TABLE us_county_coordinates
-- RENAME COLUMN state TO state_abbr;

-- select * from aqi_2015;
-- select * from us_county_coordinates;

-- select
-- 	us_county_coordinates.zip,
-- 	us_county_coordinates.state_abbr,
-- 	us_county_coordinates.county,
-- 	us_county_coordinates.primary_city,
-- 	us_county_coordinates.latitude,
-- 	us_county_coordinates.longitude,
-- 	us_state_abbr.state
-- from us_county_coordinates
-- Inner join us_state_abbr
-- 	on us_state_abbr.abbreviation = us_county_coordinates.state_abbr;

-- CREATE TABLE us_state_county_coordinates (
--  	state_county VARCHAR(255),
-- 	latitude REAL,
-- 	longitude REAL
-- );

-- select * from us_state_county_coordinates

-- select
-- 	concat (state_name, '_','',county_name) as state_county
-- from aqi_2020;

-- alter table aqi_2020 add column state_county varchar(255);

select * from aqi_2020;

-- update aqi_2020
-- set state_county = COALESCE(state_name, '') || '_' || COALESCE(county_name, '')
-- ;

insert into aqi_2020 (latitude, longitude)
select uscc.latitude, uscc.longitude 
from aqi_2020 as aq
inner join us_state_county_coordinates as uscc
	on uscc.state_county = COALESCE(aq.state_name, '') || '_' || COALESCE(aq.county_name, '')
;
