/*
  # Create tables for CRUD system

  1. New Tables
    - products
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - price (numeric)
      - stock (integer)
      - created_at (timestamp)
      
    - customers
      - id (uuid, primary key)
      - name (text)
      - email (text)
      - phone (text)
      - address (text)
      - created_at (timestamp)
      
    - users
      - id (uuid, primary key)
      - name (text)
      - email (text)
      - role (text)
      - created_at (timestamp)
      
    - orders
      - id (uuid, primary key)
      - customer_id (uuid, foreign key)
      - total (numeric)
      - status (text)
      - created_at (timestamp)
      
    - suppliers
      - id (uuid, primary key)
      - name (text)
      - email (text)
      - phone (text)
      - address (text)
      - created_at (timestamp)
      
    - invoices
      - id (uuid, primary key)
      - order_id (uuid, foreign key)
      - amount (numeric)
      - status (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL DEFAULT 0,
  stock integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to products"
  ON products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  address text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to customers"
  ON customers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Users table
CREATE TABLE IF NOT EXISTS system_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'user',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE system_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to system_users"
  ON system_users
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  total numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to orders"
  ON orders
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  address text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to suppliers"
  ON suppliers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  amount numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to invoices"
  ON invoices
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);