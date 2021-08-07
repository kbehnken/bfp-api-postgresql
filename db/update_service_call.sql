UPDATE service_calls
SET service_date = $1,
    salt = $2,
    phosphates = $3,
    tds = $4,
    filter_psi = $5,
    chlorine = $6,
    ph = $7,
    alkalinity = $8,
    cya = $9,
    trichlor_shock = $10,
    soda_ash = $11,
    sodium_bicarbonate = $12,
    tabs = $13,
    granular_trichlor = $14,
    phosphate_remover = $15,
    user_id = $16,
    service_address_id = $17,
    technician = $18,
    start_time = $19,
    end_time = $20
WHERE id = $21;

SELECT * FROM service_calls;