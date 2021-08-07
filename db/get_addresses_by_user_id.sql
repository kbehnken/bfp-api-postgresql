SELECT
c.first_name first_name,
c.last_name last_name,
c.user_role user_role,
c.id user_id,
a.street_address street_address,
a.city city,
a.state state,
a.postal_code postal_code,
a.id address_id,
a.map_url map_url,
a.photo_url photo_url,
a.latidue latitude,
a.longitude longitude,

FROM users c
JOIN service_addresses a
ON c.id = a.user_id
WHERE c.id = $1;