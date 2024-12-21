/*
  # Course Management Schema

  1. New Tables
    - `courses`
      - Core course information
      - Tracks title, description, image, duration, level, provider
    - `course_modules`
      - Course modules/sections
      - Links to parent course
    - `course_lessons`
      - Individual lessons within modules
      - Tracks content, type, duration
    - `course_skills`
      - Skills taught in each course
      - Many-to-many relationship
    - `skills`
      - Master list of available skills
    - `course_enrollments`
      - Tracks user enrollment and progress
    - `lesson_completions`
      - Tracks completed lessons per user

  2. Security
    - Enable RLS on all tables
    - Admin users can manage all content
    - Authenticated users can read courses and track their progress
*/

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  duration text NOT NULL,
  level text NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
  provider text NOT NULL,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create course modules table
CREATE TABLE IF NOT EXISTS course_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  duration text NOT NULL,
  sequence_number integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(course_id, sequence_number)
);

-- Create course lessons table
CREATE TABLE IF NOT EXISTS course_lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid REFERENCES course_modules(id) ON DELETE CASCADE,
  title text NOT NULL,
  duration text NOT NULL,
  type text NOT NULL CHECK (type IN ('video', 'reading', 'quiz')),
  content text NOT NULL,
  sequence_number integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(module_id, sequence_number)
);

-- Create course skills junction table
CREATE TABLE IF NOT EXISTS course_skills (
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  skill_id uuid REFERENCES skills(id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, skill_id)
);

-- Create course enrollments table
CREATE TABLE IF NOT EXISTS course_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  UNIQUE(user_id, course_id)
);

-- Create lesson completions table
CREATE TABLE IF NOT EXISTS lesson_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id uuid REFERENCES course_lessons(id) ON DELETE CASCADE,
  completed_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Enable RLS on all tables
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_completions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Skills policies
CREATE POLICY "Anyone can read skills"
  ON skills FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can modify skills"
  ON skills
  USING (auth.jwt() ->> 'role' = 'admin');

-- Courses policies
CREATE POLICY "Anyone can read published courses"
  ON courses FOR SELECT
  TO authenticated
  USING (is_published = true);

CREATE POLICY "Only admins can modify courses"
  ON courses
  USING (auth.jwt() ->> 'role' = 'admin');

-- Course modules policies
CREATE POLICY "Anyone can read course modules"
  ON course_modules FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM courses 
    WHERE courses.id = course_modules.course_id 
    AND courses.is_published = true
  ));

CREATE POLICY "Only admins can modify course modules"
  ON course_modules
  USING (auth.jwt() ->> 'role' = 'admin');

-- Course lessons policies
CREATE POLICY "Anyone can read course lessons"
  ON course_lessons FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM course_modules 
    JOIN courses ON courses.id = course_modules.course_id
    WHERE course_modules.id = course_lessons.module_id 
    AND courses.is_published = true
  ));

CREATE POLICY "Only admins can modify course lessons"
  ON course_lessons
  USING (auth.jwt() ->> 'role' = 'admin');

-- Course skills policies
CREATE POLICY "Anyone can read course skills"
  ON course_skills FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can modify course skills"
  ON course_skills
  USING (auth.jwt() ->> 'role' = 'admin');

-- Course enrollments policies
CREATE POLICY "Users can read their own enrollments"
  ON course_enrollments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll themselves"
  ON course_enrollments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Lesson completions policies
CREATE POLICY "Users can read their own completions"
  ON lesson_completions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can mark lessons as complete"
  ON lesson_completions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);