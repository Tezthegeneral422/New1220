/*
  # Job Applications Schema

  1. New Tables
    - `job_applications`
      - Tracks user job applications
      - Stores application status and details
      - Links to jobs and users

  2. Security
    - Enable RLS
    - Users can only access their own applications
*/

CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'submitted', 'interviewing', 'offered', 'rejected')),
  cover_letter text,
  resume_url text,
  applied_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, job_id)
);

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own applications"
  ON job_applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications"
  ON job_applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications"
  ON job_applications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);