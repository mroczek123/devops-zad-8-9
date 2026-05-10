CREATE TABLE IF NOT EXISTS products (
    id   SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL DEFAULT 0
);
TRUNCATE TABLE products;
INSERT INTO products (name, price) VALUES ('Widget', 9.99), ('Gadget', 24.99), ('Doohickey', 4.49);