CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  is_admin BOOLEAN,
  user_role VARCHAR(40) NOT NULL,
  first_name VARCHAR(40) NOT NULL,
  last_name VARCHAR(40) NOT NULL,
  phone_number VARCHAR(40),
  email_address VARCHAR(60) NOT NULL,
  hash text
);

CREATE TABLE customers
(
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(40) NOT NULL,
  phone_number VARCHAR(40),
  email_address VARCHAR(60)
);

CREATE TABLE vendors
(
  id SERIAL PRIMARY KEY,
  vendor_name VARCHAR(40) NOT NULL,
  phone_number VARCHAR(40),
  email_address VARCHAR(60)
);

CREATE TABLE service_addresses
(
  id SERIAL PRIMARY KEY,
  street_address VARCHAR(70) NOT NULL,
  city VARCHAR(40) NOT NULL,
  state VARCHAR(40) NOT NULL,
  postal_code VARCHAR(10) NOT NULL,
  user_id INTEGER REFERENCES users(id),
  map_url VARCHAR(70),
  photo_url VARCHAR(70),
  latitude real,
  longitude real 
);

CREATE TABLE service_calls
(
  id SERIAL PRIMARY KEY,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  user_id INTEGER REFERENCES users(id),
  salt REAL,
  phosphates REAL,
  tds REAL,
  filter_psi REAL,
  chlorine REAL,
  ph REAL,
  alkalinity REAL,
  cya REAL,
  trichlor_shock REAL,
  soda_ash REAL,
  sodium_bicarbonate REAL,
  tabs INTEGER,
  granular_trichlor REAL,
  phosphate_remover REAL,
  muriatic_acid REAL,
  sodium_thiosulfate REAL,
  stabilizer REAL,
  green_to_clean REAL,
  de REAL,
  service_address_id INTEGER REFERENCES service_addresses(id)
);

CREATE TABLE invoices
(
  id SERIAL PRIMARY KEY,
  service_start TIMESTAMP NOT NULL,
  service_end TIMESTAMP NOT NULL,
  invoice_number INTEGER NOT NULL,
  invoice_amount INTEGER NOT NULL,
  payment_date TIMESTAMP,
  payment_type varchar(40),
  payment_amount INTEGER,
  invoice_balance INTEGER,
  invoice_status varchar(40),
  user_id INTEGER REFERENCES users(id),
  service_address_id INTEGER REFERENCES service_addresses(id),
  invoice_url  varchar(70)
);

CREATE TABLE services
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(70) NOT NULL,
  description TEXT
);

CREATE TABLE services_to_service_calls
(
  PRIMARY KEY (service_id, service_call_id),
  service_id INTEGER REFERENCES services(id),
  service_call_id INTEGER REFERENCES service_calls(id)
);

CREATE TABLE equipment
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(70) NOT NULL,
  description TEXT,
  service_address_id INTEGER REFERENCES service_addresses(id),
  category VARCHAR(40)
);

CREATE TABLE photos
(
  id SERIAL PRIMARY KEY,
  date_taken VARCHAR(40),
  category VARCHAR(40),
  photo_url VARCHAR(70),
  user_id INTEGER REFERENCES users(id),
  service_call_id INTEGER REFERENCES service_calls(id)
);

INSERT INTO service_calls 
VALUES
(
'2020-01-27T00:00:00Z',
'2020-01-27T00:30:00Z',
8,
3900,
null,
null,
30,
15,
8.4,
240,
300,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
5
);

CREATE TABLE travel_events
(
id SERIAL PRIMARY KEY,
event_time TIMESTAMP NOT NULL,
latitude REAL NOT NULL,
longitude REAL NOT NULL,
event_type VARCHAR(20) NOT NULL,
service_address_id INTEGER REFERENCES service_addresses(id),
user_id INTEGER REFERENCES users(id)
);

SELECT sc.id, sc.start_time AS "startTime", sc.end_time AS "endTime", sc.user_id AS "userId", sc.salt, sc.phosphates, sc.tds, sc.filter_psi AS "filterPsi", sc.chlorine, sc.ph, sc.alkalinity, sc.cya, sc.trichlor_shock AS "trichlorShock", sc.soda_ash AS "sodaAsh", sc.sodium_bicarbonate AS "sodiumBicarbonate", sc.tabs, sc.granular_trichlor As "granularTrichlor", sc.phosphate_remover AS "phosphateRemover", sc.muriatic_acid AS "muriaticAcid", sc.sodium_thiosulfate AS "sodiumThiosulfate", sc.stabilizer, sc.green_to_clean AS "greenToClean", sc.de, sc.service_address_id AS "serviceAddressId", CONCAT(u.first_name, ' ', u.last_name) AS technician, c.customer_name AS customer, s.id, s.name
FROM service_calls AS sc
LEFT JOIN users AS u
ON u.id = sc.user_id
LEFT JOIN service_addresses AS sa
ON sa.id = sc.service_address_id
LEFT JOIN customers AS c
ON c.id = sa.customer_id
LEFT JOIN services_to_service_calls AS stsc
ON stsc.service_call_id = sc.id
LEFT JOIN services as s
ON stsc.service_id = s.id;

INSERT INTO invoices
(service_start, service_end, invoice_number, invoice_amount, payment_date, payment_type, payment_amount, user_id, service_address_id, invoice_url) 
VALUES
(
'09/19/19',
'12/13/19',
1525,
99.99,
'01/05/20',
'Zelle',
99.99,
8,
5,
'http://images.beachfamilypools.com/invoice-1525-graves.pdf'
);

INSERT INTO photos
(date_taken, category, photo_url, user_id, service_call_id) 
VALUES
(
'11/14/19',
null,
'http://images.beachfamilypools.com/customer_pool1.jpg',
8,
1
);

SELECT * FROM photos;