/*
  # Add Subscription System

  1. New Tables
    - `subscription_plans`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (integer, in cents)
      - `interval` (text: monthly/yearly)
      - `features` (text array)
      - `is_active` (boolean)
    - `user_subscriptions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `plan_id` (uuid, references subscription_plans)
      - `status` (text: active/cancelled/expired)
      - `current_period_start` (timestamptz)
      - `current_period_end` (timestamptz)
      - `cancel_at_period_end` (boolean)

  2. Security
    - Enable RLS on both tables
    - Add policies for reading and managing subscriptions
*/

-- Create subscription_plans table
CREATE TABLE subscription_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price integer NOT NULL,
  interval text NOT NULL CHECK (interval IN ('monthly', 'yearly')),
  features text[] NOT NULL DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_subscriptions table
CREATE TABLE user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id uuid REFERENCES subscription_plans(id) ON DELETE RESTRICT,
  status text NOT NULL CHECK (status IN ('active', 'cancelled', 'expired')),
  current_period_start timestamptz NOT NULL,
  current_period_end timestamptz NOT NULL,
  cancel_at_period_end boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscription_plans
CREATE POLICY "Anyone can view active subscription plans"
  ON subscription_plans FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Only admins can modify subscription plans"
  ON subscription_plans
  USING (auth.jwt() ->> 'role' = 'admin');

-- RLS Policies for user_subscriptions
CREATE POLICY "Users can view their own subscription"
  ON user_subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Only admins can modify subscriptions"
  ON user_subscriptions
  USING (auth.jwt() ->> 'role' = 'admin');

-- Insert default subscription plans
INSERT INTO subscription_plans (name, description, price, interval, features) VALUES
('Free', 'Basic access to platform features', 0, 'monthly', ARRAY[
  'Access to job board',
  'Basic skill tracking',
  'Limited course access'
]),
('Pro', 'Enhanced features for career growth', 1999, 'monthly', ARRAY[
  'All Free features',
  'Unlimited course access',
  'Advanced skill analytics',
  'Priority job applications',
  'Career coaching sessions'
]),
('Enterprise', 'Complete solution for teams', 4999, 'monthly', ARRAY[
  'All Pro features',
  'Team collaboration tools',
  'Custom learning paths',
  'Dedicated support',
  'API access'
]);