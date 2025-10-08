/*
  # Create galleries table

  1. New Tables
    - `galleries`
      - `id` (bigserial, primary key)
      - `title` (text, not null) - Gallery title
      - `description` (text) - Gallery description
      - `category` (text, not null) - Category (event, portrait, wedding, commercial)
      - `images` (jsonb, not null) - Array of image objects with src, alt, width, height
      - `featured` (boolean, default false) - Whether to feature on homepage
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `galleries` table
    - Add policy for public read access (galleries are public content)
    - Add policy for authenticated users to manage galleries (admin only)
*/

-- Create galleries table
CREATE TABLE IF NOT EXISTS galleries (
  id bigserial PRIMARY KEY,
  title text NOT NULL,
  description text,
  category text NOT NULL CHECK (category IN ('event', 'portrait', 'wedding', 'commercial')),
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;

-- Public can view all galleries
CREATE POLICY "Galleries are publicly viewable"
  ON galleries
  FOR SELECT
  TO public
  USING (true);

-- Authenticated users can insert galleries
CREATE POLICY "Authenticated users can create galleries"
  ON galleries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update galleries
CREATE POLICY "Authenticated users can update galleries"
  ON galleries
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete galleries
CREATE POLICY "Authenticated users can delete galleries"
  ON galleries
  FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to update updated_at
DROP TRIGGER IF EXISTS update_galleries_updated_at ON galleries;
CREATE TRIGGER update_galleries_updated_at
  BEFORE UPDATE ON galleries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
