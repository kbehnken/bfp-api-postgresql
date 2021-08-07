INSERT INTO users
(is_admin, role, first_name, last_name, phone_number, email_address, hash)
VALUES
($1, $2, $3, $4, $5, $6, $7)
returning *;