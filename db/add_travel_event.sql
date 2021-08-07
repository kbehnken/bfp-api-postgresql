INSERT INTO travel_events
(event_time, latitude, longitude, service_address_id, user_id)
VALUES
($1, $2, $3, $4, $5);

SELECT * FROM travel_events
WHERE id = lastval();