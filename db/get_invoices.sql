SELECT
i.id invoice_id,
i.service_start service_start,
i.service_end service_end,
i.invoice_number invoice_number,
i.invoice_amount invoice_amount,
i.payment_date payment_date,
i.payment_type payment_type,
i.payment_amount payment_amount,
i.invoice_balance invoice_balance,
i.invoice_status invoice_status,
i.user_id user_id,
i.invoice_url invoice_url,
u.first_name first_name,
u.last_name last_name,
s.street_address street_address
FROM users u 
LEFT JOIN invoices i ON i.user_id = u.id
LEFT JOIN service_addresses s ON s.user_id = u.id
WHERE u.id = $1
ORDER BY i.invoice_number DESC;