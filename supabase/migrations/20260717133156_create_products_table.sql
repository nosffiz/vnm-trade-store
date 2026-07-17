/*
# Create products table (single-tenant, no auth)

1. New Tables
- `products`
  - `id` (uuid, primary key)
  - `title` (text, not null) - product name
  - `price` (numeric, not null) - product price
  - `category` (text, not null) - product category
  - `description` (text) - product description
  - `image_url` (text) - product image URL
  - `featured` (boolean, default false) - whether to show on homepage
  - `created_at` (timestamptz) - creation timestamp

2. Security
- Enable RLS on `products`.
- Allow anon + authenticated CRUD because the store data is intentionally public/shared.
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  price numeric(10, 2) NOT NULL,
  category text NOT NULL,
  description text,
  image_url text,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_products" ON products;
CREATE POLICY "anon_insert_products" ON products FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_products" ON products;
CREATE POLICY "anon_update_products" ON products FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_products" ON products;
CREATE POLICY "anon_delete_products" ON products FOR DELETE
  TO anon, authenticated USING (true);
