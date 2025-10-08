/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text) - Full name of the person contacting
      - `email` (text) - Contact email address
      - `phone` (text, optional) - Contact phone number
      - `services` (text array) - List of services they're interested in
      - `event_date` (date, optional) - Preferred date for the event/session
      - `message` (text) - Additional message or details
      - `created_at` (timestamptz) - When the submission was received
      - `status` (text) - Status of the inquiry (new, contacted, completed)

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for authenticated admin users to view submissions
    - Allow public to insert submissions (for the contact form)
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  services text[] NOT NULL DEFAULT '{}',
  event_date date,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);