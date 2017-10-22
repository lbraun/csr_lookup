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
