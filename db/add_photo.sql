INSERT INTO photos
(date_taken, category, photo_url, user_id, service_call_id)
VALUES
($1, $2, $3, $4, $5);

SELECT * FROM photos
WHERE service_call_id = $5;