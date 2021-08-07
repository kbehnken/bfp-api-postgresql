INSERT INTO service_calls
(call_id, service_date, salt, phosphates, tds, filter_psi, chlorine, ph, alkalinity, cya, trichlor_shock, soda_ash, sodium_bicarbonate, tabs, granular_trichlor, phosphate_remover, user_id, service_address_id, technician, start_time, end_time)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21);

SELECT * FROM services_calls;