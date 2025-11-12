-- Star_Housekeeping  Database Setup
-- Run this in Supabase SQL Editor

-- Create plans table
CREATE TABLE plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  speed VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  features TEXT[] NOT NULL,
  data_cap VARCHAR(100) NOT NULL,
  contract_length INTEGER NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  plan_id UUID REFERENCES plans(id),
  subscription_status VARCHAR(20) DEFAULT 'inactive',
  role VARCHAR(20) DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample plans
INSERT INTO plans (name, description, speed, price, features, data_cap, contract_length, is_featured) VALUES
('Basic Plan', 'Perfect for light internet usage', '50 Mbps', 29.99, ARRAY['50 Mbps download', '10 Mbps upload', 'Unlimited data', 'Basic support'], 'Unlimited', 12, false),
('Standard Plan', 'Great for streaming and gaming', '200 Mbps', 49.99, ARRAY['200 Mbps download', '50 Mbps upload', 'Unlimited data', 'Priority support', 'Free installation'], 'Unlimited', 12, true),
('Premium Plan', 'Ultra-fast internet for power users', '1 Gbps', 79.99, ARRAY['1 Gbps download', '200 Mbps upload', 'Unlimited data', '24/7 priority support', 'Free installation', 'Free modem'], 'Unlimited', 12, true);
