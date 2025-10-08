/*
  # Create testimonials table

  1. New Tables
    - `testimonials`
      - `id` (uuid, primary key) - Unique identifier for each testimonial
      - `client_name` (text, required) - Name of the person giving the testimonial
      - `client_title` (text, optional) - Job title or role of the client
      - `company` (text, optional) - Company or organization name
      - `testimonial_text` (text, required) - The actual testimonial content
      - `rating` (integer, optional) - Star rating out of 5
      - `photo_url` (text, optional) - URL to client photo
      - `display_order` (integer, default 0) - Order for displaying testimonials
      - `is_published` (boolean, default true) - Whether to show this testimonial
      - `created_at` (timestamptz) - When the testimonial was created
      - `updated_at` (timestamptz) - When the testimonial was last updated

  2. Security
    - Enable RLS on `testimonials` table
    - Add policy for public read access to published testimonials
    - Add policy for authenticated users to manage all testimonials
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_title text,
  company text,
  testimonial_text text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  photo_url text,
  display_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published testimonials"
  ON testimonials
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Authenticated users can view all testimonials"
  ON testimonials
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert testimonials"
  ON testimonials
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update testimonials"
  ON testimonials
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete testimonials"
  ON testimonials
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS testimonials_display_order_idx ON testimonials(display_order);
CREATE INDEX IF NOT EXISTS testimonials_is_published_idx ON testimonials(is_published);
