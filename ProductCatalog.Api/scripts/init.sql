CREATE TABLE departments (
    code VARCHAR(3) PRIMARY KEY,
    description TEXT NOT NULL
);

CREATE TABLE products (
    id UUID PRIMARY KEY,
    code TEXT NOT NULL,
    description TEXT NOT NULL,
    department_code VARCHAR(3) REFERENCES departments(code),
    price DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    deleted BOOLEAN DEFAULT false
);

INSERT INTO departments (code, description) VALUES
('010', 'BEBIDAS'),
('020', 'CONGELADOS'),
('030', 'LATICINIOS'),
('040', 'VEGETAIS');