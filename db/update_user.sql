UPDATE users
SET is_admin = $1,
    user_role = $2,
    first_name = $3,
    last_name = $4,
    phone_number = $5,
    email_address = $6,
    hash = $7
WHERE id = $8;

SELECT * FROM users;