/*
  # Add User Tracking Tables

  1. New Tables
    - `user_profiles`
      - Extended user information and preferences
    - `user_routines`
      - Daily routines and habit tracking
    - `user_goals`
      - Personal and professional goals
    - `user_skills_tracking`
      - Skill progress and assessments

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
*/

-- User Profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text,
  last_name text,
  career_level text CHECK (career_level IN ('entry', 'mid', 'senior', 'transitioning')),
  career_focus text[] DEFAULT '{}',
  tracking_preferences text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Routines
CREATE TABLE IF NOT EXISTS user_routines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  schedule text[] DEFAULT '{}',
  streak integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Routine Completions
CREATE TABLE IF NOT EXISTS routine_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_id uuid REFERENCES user_routines(id) ON DELETE CASCADE,
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- User Goals
CREATE TABLE IF NOT EXISTS user_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  type text CHECK (type IN ('skill', 'course', 'career', 'project')),
  target_date date,
  progress integer DEFAULT 0,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Skills Tracking
CREATE TABLE IF NOT EXISTS user_skills_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_id uuid REFERENCES skills(id) ON DELETE CASCADE,
  level text CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  last_assessed timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, skill_id)
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE routine_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills_tracking ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- User Profiles
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- User Routines
CREATE POLICY "Users can view their own routines"
  ON user_routines FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own routines"
  ON user_routines FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Routine Completions
CREATE POLICY "Users can view their routine completions"
  ON routine_completions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_routines
      WHERE user_routines.id = routine_completions.routine_id
      AND user_routines.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage their routine completions"
  ON routine_completions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_routines
      WHERE user_routines.id = routine_completions.routine_id
      AND user_routines.user_id = auth.uid()
    )
  );

-- User Goals
CREATE POLICY "Users can view their own goals"
  ON user_goals FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own goals"
  ON user_goals FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- User Skills Tracking
CREATE POLICY "Users can view their own skill tracking"
  ON user_skills_tracking FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own skill tracking"
  ON user_skills_tracking FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);