INSERT INTO invoices
(service_start, service_end, invoice_number, invoice_amount, payment_date, payment_type, payment_amount, invoice_balance, invoice_status, user_id, service_address_id)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);

SELECT * FROM invoices;