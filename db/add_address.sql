INSERT INTO service_addresses
(street_address, city, state, postal_code, user_id, map_url, photo_url, latitude, longitude)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9);

SELECT * FROM service_addresses
WHERE id = lastval();