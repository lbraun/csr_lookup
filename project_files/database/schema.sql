DROP DATABASE csr_lookup;

CREATE DATABASE csr_lookup;

\connect csr_lookup;

CREATE TABLE users (
    "id" SERIAL PRIMARY KEY,
    "name" text
);

CREATE TABLE companies (
    "id" SERIAL PRIMARY KEY,
    "name" text,
    "wikipedia_name" text,
    "industry" text
);

CREATE TABLE evidence_records (
    "id" SERIAL PRIMARY KEY,
    "title" text,
    "reference_url" text,
    "reference_title" text,
    "description" text,
    "score" decimal,
    "fk_created_by" integer REFERENCES users (id),
    "fk_company_id" integer REFERENCES companies (id)
);

CREATE TABLE rating_records (
    "id" SERIAL PRIMARY KEY,
    "rating" decimal,
    "fk_created_by" integer REFERENCES users (id),
    "fk_company_id" integer REFERENCES companies (id)
);


CREATE OR REPLACE VIEW public.vw_companies_information
    WITH (security_barrier = false)
    AS
    SELECT
        companies.id,
        companies.name,
        companies.wikipedia_name,
        companies.industry,
        avg(rating_records.rating) AS rating,
        avg(evidence_records.score) AS responsibility_score
    FROM companies
        LEFT JOIN rating_records ON companies.id = rating_records.fk_company_id
        LEFT JOIN evidence_records ON companies.id = evidence_records.fk_company_id
    GROUP BY companies.id, companies.name, companies.wikipedia_name, companies.industry;
