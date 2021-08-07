SELECT
c.id call_id,
c.service_date service_date,
c.salt salt,
c.phosphates phosphates,
c.tds tds,
c.filter_psi filter_psi,
c.chlorine chlorine,
c.ph ph,
c.alkalinity alkalinity,
c.cya cya,
c.trichlor_shock trichlor_shock,
c.soda_ash soda_ash,
c.sodium_bicarbonate sodium_bicarbonate,
c.tabs tabs,
c.granular_trichlor granular_trichlor,
c.phosphate_remover phosphate_remover,
c.user_id user_id,
c.service_address_id service_address_id,
c.technician technician,
c.start_time start_time,
c.end_time end_time,
u.first_name first_name,
u.last_name last_name,
s.street_address street_address
FROM users u 
LEFT JOIN service_calls c ON c.user_id = u.id
LEFT JOIN service_addresses s ON s.user_id = u.id
WHERE u.id = $1;