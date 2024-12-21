/*
  # Add missing tables and relationships

  1. New Tables
    - `skill_assessments` - Track user skill assessments
    - `course_reviews` - User reviews for courses
    - `user_notifications` - User notification preferences and history

  2. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users
*/

-- Skill Assessments
CREATE TABLE IF NOT EXISTS skill_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_id uuid REFERENCES skills(id) ON DELETE CASCADE,
  score integer NOT NULL CHECK (score >= 0 AND score <= 100),
  completed_at timestamptz DEFAULT now(),
  next_assessment_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, skill_id, completed_at)
);

-- Course Reviews
CREATE TABLE IF NOT EXISTS course_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- User Notifications
CREATE TABLE IF NOT EXISTS user_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE skill_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Skill Assessments
CREATE POLICY "Users can view their own assessments"
  ON skill_assessments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own assessments"
  ON skill_assessments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Course Reviews
CREATE POLICY "Anyone can read course reviews"
  ON course_reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their own reviews"
  ON course_reviews FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- User Notifications
CREATE POLICY "Users can view their own notifications"
  ON user_notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON user_notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);