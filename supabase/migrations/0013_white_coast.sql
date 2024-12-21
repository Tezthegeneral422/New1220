/*
  # Add subscription checks and job applications

  1. New Functions
    - check_subscription_status: Validates if a user has an active paid subscription
    - get_subscription_tier: Returns the tier level of a user's subscription
  
  2. Tables
    - job_applications: Track user job applications with status and documents
  
  3. Security
    - Add RLS policies for job applications
    - Add subscription-aware policies for course access
*/

-- Function to check if user has active paid subscription
CREATE OR REPLACE FUNCTION public.check_subscription_status(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_subscriptions us
    JOIN subscription_plans sp ON us.plan_id = sp.id
    WHERE us.user_id = $1
    AND us.status = 'active'
    AND sp.price > 0
    AND us.current_period_end > NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get subscription tier
CREATE OR REPLACE FUNCTION public.get_subscription_tier(user_id uuid)
RETURNS text AS $$
DECLARE
  plan_name text;
BEGIN
  SELECT sp.name INTO plan_name
  FROM user_subscriptions us
  JOIN subscription_plans sp ON us.plan_id = sp.id
  WHERE us.user_id = $1
  AND us.status = 'active'
  AND us.current_period_end > NOW()
  LIMIT 1;
  
  RETURN COALESCE(plan_name, 'free');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing policies
DROP POLICY IF EXISTS "Free users can only access basic courses" ON course_enrollments;
DROP POLICY IF EXISTS "Users can view their own applications" ON job_applications;
DROP POLICY IF EXISTS "Users can create their own applications" ON job_applications;
DROP POLICY IF EXISTS "Users can update their own applications" ON job_applications;

-- Create job applications tracking if it doesn't exist
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

-- Enable RLS on job applications
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for job applications
CREATE POLICY "Users can view their own applications"
  ON job_applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications"
  ON job_applications FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id 
    AND (
      check_subscription_status(auth.uid()) 
      OR job_id IN (
        SELECT id::text FROM subscription_plans ORDER BY created_at DESC LIMIT 2
      )
    )
  );

CREATE POLICY "Users can update their own applications"
  ON job_applications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Update RLS policies for courses
CREATE POLICY "Free users can only access basic courses"
  ON course_enrollments
  FOR SELECT
  USING (
    (auth.uid() = user_id AND check_subscription_status(auth.uid()))
    OR
    (auth.uid() = user_id AND EXISTS (
      SELECT 1 FROM courses c
      WHERE c.id = course_id
      AND c.level = 'Beginner'
    ))
  );