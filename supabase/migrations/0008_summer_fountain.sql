/*
  # Fix User Profiles RLS Policies

  1. Changes
    - Drop existing RLS policies for user_profiles
    - Add comprehensive RLS policies for all operations
    
  2. Security
    - Enable RLS
    - Add policies for INSERT, SELECT, UPDATE operations
    - Ensure users can only access their own profiles
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;

-- Create new policies
CREATE POLICY "Users can create their own profile"
  ON user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view their own profile"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);