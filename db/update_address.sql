UPDATE service_addresses
SET street_address = $1,
    city = $2,
    state = $3,
    postal_code = $4,
    map_url = $5,
    photo_url = $6
    coordinates = $7
WHERE id = $8;

SELECT * FROM service_addresses;