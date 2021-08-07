INSERT INTO equipment
(name, description, service_address_id)
VALUES
($1, $2, $3);

SELECT * FROM equipment;