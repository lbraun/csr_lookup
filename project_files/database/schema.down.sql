-- psql csr_lookup < database/schema.down.sql

DROP VIEW IF EXISTS public.vw_companies_information;
DROP TABLE IF EXISTS rating_records;
DROP TABLE IF EXISTS evidence_records;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS users;
