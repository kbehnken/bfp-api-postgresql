UPDATE equipment
SET name = $1,
    description = $2
WHERE id = $3;

SELECT * FROM equipment;