-- Database Schema for Infinity Resto
-- Run this SQL in your Supabase SQL Editor

-- Create tables table
CREATE TABLE tables (
    id SERIAL PRIMARY KEY,
    table_number INTEGER UNIQUE NOT NULL CHECK (table_number >= 1 AND table_number <= 5),
    is_occupied BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_number INTEGER NOT NULL REFERENCES tables(table_number),
    total_amount DECIMAL(10,2) NOT NULL,
    total_items INTEGER NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id TEXT NOT NULL,
    menu_item_name TEXT NOT NULL,
    menu_item_price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    variant JSONB NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial table data (5 tables)
INSERT INTO tables (table_number) VALUES 
(1), (2), (3), (4), (5);

-- Create indexes for better performance
CREATE INDEX idx_orders_table_number ON orders(table_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- Create updated_at trigger for orders
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust based on your security needs)
CREATE POLICY "Allow public read access to tables" ON tables
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to orders" ON orders
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to orders" ON orders
    FOR SELECT USING (true);

CREATE POLICY "Allow public update access to orders" ON orders
    FOR UPDATE USING (true);

CREATE POLICY "Allow public insert access to order_items" ON order_items
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to order_items" ON order_items
    FOR SELECT USING (true);