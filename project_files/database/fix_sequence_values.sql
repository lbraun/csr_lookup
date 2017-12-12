SELECT setval('companies_id_seq', (SELECT MAX(id) FROM companies) + 1);
SELECT setval('evidence_records_id_seq', (SELECT MAX(id) FROM evidence_records) + 1);
SELECT setval('rating_records_id_seq', (SELECT MAX(id) FROM rating_records) + 1);
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users) + 1);
