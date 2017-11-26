-- psql csr_lookup < database/seeds.sql

INSERT INTO
  users
VALUES
  (1, 'Alaa'),
  (2, 'Lucas');

INSERT INTO
  companies
VALUES
  (1, 'ESRI', 'Esri', 'software'),
  (2, 'Google', 'Google', 'software'),
  (3, 'Microsoft', 'Microsoft', 'software'),
  (4, 'Apple', 'Apple_Inc.', 'software'),
  (5, 'Mercadona', 'Mercadona', 'retail'),
  (6, 'Dia', 'Dia_(supermarket_chain)', 'retail'),
  (7, 'Aldi', 'Aldi', 'retail'),
  (8, 'Carrefour', 'Carrefour', 'retail'),
  (9, 'Consum', NULL, 'retail'),
  (10, 'Masymas', NULL, 'retail'),
  (11, 'Eroski', 'Eroski', 'retail'),
  (12, 'Lidl', 'Lidl', 'retail'),
  (13, 'E.Leclerc', 'E.Leclerc', 'retail');

INSERT INTO
  evidence_records
VALUES
  (1, 'Fake Title', 'http://www.fakereference.com', 'Fake Reference', 'This is a long fake description.', 10, 1, 1),
  (2, 'CO2 Emissions', 'https://research-methodology.net/apple-corporate-social-responsibility-csr/', 'Apple Corporate Social Responsibility (CSR)', 'The company’s CO2 emissions per product has been consistently decreasing during the last four years to reach 114.2 kg in 2015.', 10, 1, 4);

INSERT INTO
  rating_records
VALUES
  (1, 4, 1, 1);
