CREATE DATABASE csr_lookup;

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
    "score" int,
    "fk_created_by" int,
    "fk_company_id" int
);

CREATE TABLE users (
    "id" SERIAL PRIMARY KEY,
    "name" text
);

