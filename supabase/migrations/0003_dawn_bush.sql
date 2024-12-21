/*
  # Add job descriptions and requirements

  1. New Tables
    - `job_descriptions`
      - `id` (uuid, primary key)
      - `job_id` (text, references jobs)
      - `description` (text)
      - `requirements` (text[])
      - `responsibilities` (text[])
      - `benefits` (text[])
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on job_descriptions table
    - Add policies for authenticated users to read job descriptions
*/

CREATE TABLE IF NOT EXISTS job_descriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id text NOT NULL,
  description text NOT NULL,
  requirements text[] NOT NULL DEFAULT '{}',
  responsibilities text[] NOT NULL DEFAULT '{}',
  benefits text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE job_descriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can read job descriptions"
  ON job_descriptions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can modify job descriptions"
  ON job_descriptions
  USING (auth.jwt() ->> 'role' = 'admin');