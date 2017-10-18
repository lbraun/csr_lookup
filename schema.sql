CREATE DATABASE csr_lookup;

\connect csr_lookup;

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


ALTER TABLE evidence_records ADD FOREIGN KEY (fk_created_by) REFERENCES users (id);
ALTER TABLE evidence_records ADD FOREIGN KEY (fk_company_id) REFERENCES companies (id);

-- Seed data, if you want it:
INSERT INTO companies (name, wikipedia_name, industry) VALUES
  ('ESRI', 'Esri', 'software'),
  ('Mercadona', 'Mercadona', 'retail');