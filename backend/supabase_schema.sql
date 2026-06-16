-- ============================================================
-- Run this in Supabase SQL Editor: https://app.supabase.com
-- ============================================================

-- Users (for auth)
create table if not exists users (
  id text primary key,
  email text unique not null,
  password_hash text not null,
  created_at timestamptz default now()
);

-- Categories
create table if not exists categories (
  id text primary key,
  name text not null,
  image text,
  icon text
);

-- Products
create table if not exists products (
  id text primary key,
  name text not null,
  category text references categories(id),
  price numeric(10,2) not null,
  image text,
  unit text,
  description text,
  "inStock" boolean default true
);

-- Orders
create table if not exists orders (
  id bigint generated always as identity primary key,
  order_id text unique not null,
  first_name text,
  last_name text,
  email text,
  phone text,
  address text,
  city text,
  state text,
  zip text,
  delivery_method text,
  subtotal numeric(10,2),
  tax numeric(10,2),
  delivery_fee numeric(10,2),
  total numeric(10,2),
  created_at timestamptz default now()
);

-- Password Reset Tokens
create table if not exists password_reset_tokens (
  id bigint generated always as identity primary key,
  user_id text references users(id) on delete cascade,
  token text unique not null,
  expires_at timestamptz not null,
  used boolean default false,
  created_at timestamptz default now()
);
create table if not exists order_items (
  id bigint generated always as identity primary key,
  order_id bigint references orders(id) on delete cascade,
  product_id text,
  name text,
  price numeric(10,2),
  quantity int,
  unit text
);

-- ============================================================
-- Seed Data
-- ============================================================

insert into categories (id, name, image, icon) values
  ('vegetables', 'Vegetables', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', 'Carrot'),
  ('fruits',     'Fruits',     'https://images.unsplash.com/photo-1725208961101-4c28375bdee7?w=400', 'Apple'),
  ('bakery',     'Bakery',     'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400', 'Croissant'),
  ('dairy',      'Dairy',      'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', 'Milk'),
  ('meat',       'Meat & Seafood', 'https://images.unsplash.com/photo-1700478934617-75d2d4f01a04?w=400', 'Beef')
on conflict (id) do nothing;

insert into products (id, name, category, price, image, unit, description, "inStock") values
  ('1',  'Organic Broccoli',      'vegetables', 49.00,   'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', 'per head',   'Fresh organic broccoli, rich in vitamins and minerals.', true),
  ('2',  'Red Bell Peppers',      'vegetables', 59.00,   'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', 'per 500g',   'Sweet and crunchy red bell peppers, perfect for salads.', true),
  ('3',  'Baby Carrots',          'vegetables', 39.00,   'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', 'per bag',    'Pre-washed baby carrots, ready to eat.', true),
  ('4',  'Fresh Spinach',         'vegetables', 29.00,   'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', 'per bunch',  'Tender fresh spinach leaves, perfect for salads or cooking.', true),
  ('5',  'Honeycrisp Apples',     'fruits',     149.00,  'https://images.unsplash.com/photo-1725208961101-4c28375bdee7?w=400', 'per kg',     'Crispy, sweet Honeycrisp apples.', true),
  ('6',  'Fresh Strawberries',    'fruits',     99.00,   'https://images.unsplash.com/photo-1725208961101-4c28375bdee7?w=400', 'per punnet', 'Sweet, juicy strawberries.', true),
  ('7',  'Organic Bananas',       'fruits',     49.00,   'https://images.unsplash.com/photo-1725208961101-4c28375bdee7?w=400', 'per dozen',  'Organic yellow bananas, perfect for snacking.', true),
  ('8',  'Blueberries',           'fruits',     199.00,  'https://images.unsplash.com/photo-1725208961101-4c28375bdee7?w=400', 'per punnet', 'Fresh, plump blueberries packed with antioxidants.', true),
  ('9',  'Artisan Sourdough',     'bakery',     89.00,   'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400', 'per loaf',   'Handcrafted sourdough bread with a crispy crust.', true),
  ('10', 'Butter Croissants',     'bakery',     129.00,  'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400', 'pack of 6',  'Flaky, buttery croissants baked fresh daily.', true),
  ('11', 'Whole Wheat Bread',     'bakery',     55.00,   'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400', 'per loaf',   'Nutritious whole wheat sandwich bread.', true),
  ('12', 'Chocolate Chip Cookies','bakery',     79.00,   'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400', 'pack of 12', 'Homemade-style chocolate chip cookies.', true),
  ('13', 'Whole Milk',            'dairy',      65.00,   'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', 'per litre',  'Fresh whole milk from local farms.', true),
  ('14', 'Greek Yogurt',          'dairy',      119.00,  'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', 'per 400g',   'Thick and creamy Greek yogurt, high in protein.', true),
  ('15', 'Sharp Cheddar',         'dairy',      249.00,  'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', 'per 200g',   'Aged sharp cheddar cheese.', true),
  ('16', 'Organic Eggs',          'dairy',      89.00,   'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', 'dozen',      'Cage-free organic eggs.', true),
  ('17', 'Chicken Breast',        'meat',       299.00,  'https://images.unsplash.com/photo-1700478934617-75d2d4f01a04?w=400', 'per kg',     'Boneless, skinless chicken breast.', true),
  ('18', 'Ground Beef',           'meat',       349.00,  'https://images.unsplash.com/photo-1700478934617-75d2d4f01a04?w=400', 'per kg',     '85% lean ground beef.', true),
  ('19', 'Wild Salmon',           'meat',       599.00,  'https://images.unsplash.com/photo-1700478934617-75d2d4f01a04?w=400', 'per kg',     'Fresh wild-caught salmon fillet.', true),
  ('20', 'Pork Chops',            'meat',       399.00,  'https://images.unsplash.com/photo-1700478934617-75d2d4f01a04?w=400', 'per kg',     'Thick-cut bone-in pork chops.', true)
on conflict (id) do update set price = EXCLUDED.price, unit = EXCLUDED.unit;
