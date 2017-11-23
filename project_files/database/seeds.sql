INSERT INTO users (name) VALUES
  ('Alaa'),
  ('Lucas');

INSERT INTO companies (name, wikipedia_name, industry) VALUES
  ('ESRI', 'Esri', 'software'),
  ('Mercadona', 'Mercadona', 'retail');

INSERT INTO evidence_records (title, reference_url, reference_title, description, score, fk_created_by, fk_company_id) VALUES
  ('Fake Title', 'http://www.fakereference.com', 'Fake Reference', 'This is a long fake description.', 10, 1, 1);

INSERT INTO rating_records (rating, fk_created_by, fk_company_id) VALUES
  (4, 1, 1);
