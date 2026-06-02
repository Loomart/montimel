-- FILE: supabase_schema.sql
-- PURPOSE: Initial Database Schema for Monti Honey E-commerce

-- 1. EXTENSIONS & ENUMS
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types for better validation
CREATE TYPE user_role AS ENUM ('customer', 'admin');
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'shipped', 'delivered', 'cancelled');

-- 2. TABLES

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    role user_role DEFAULT 'customer',
    phone TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
    weight TEXT,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    status order_status DEFAULT 'pending',
    total_amount NUMERIC(10,2) NOT NULL,
    shipping_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items (Detail table)
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price_at_time NUMERIC(10,2) NOT NULL
);

-- Global settings/Config (For the "Configurable" store)
CREATE TABLE site_settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    description TEXT
);

-- 3. ROW LEVEL SECURITY (RLS)
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 4. POLICIES (Security Rules)

-- Products: Everyone can view, only Admins can edit
CREATE POLICY "Public products are viewable by everyone" 
ON products FOR SELECT USING (true);

CREATE POLICY "Admin can manage products" 
ON products FOR ALL USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Orders: Users can only see their own orders, Admins see all
CREATE POLICY "Users can view own orders" 
ON orders FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all orders" 
ON orders FOR ALL USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Site Settings: Public read, Admin write
CREATE POLICY "Settings are public" 
ON site_settings FOR SELECT USING (true);

CREATE POLICY "Admin can update settings" 
ON site_settings FOR ALL USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- 5. INDEXES for performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- 6. AUTOMATIC PROFILE CREATION TRIGGER
-- Trigger to create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'customer');
  RETURN new;
END;$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
