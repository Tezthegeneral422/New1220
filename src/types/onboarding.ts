export type CareerLevel = 'entry' | 'mid' | 'senior' | 'transitioning' | null;
export type CareerFocus = 'technology' | 'business' | 'creative';
export type GoalType = 'upskilling' | 'routines' | 'career';
export type TrackingPreference = 'productivity' | 'skills' | 'work-life';
export type CourseCategory = 'leadership' | 'tech' | 'soft-skills';

export interface OnboardingData {
  // Basic Info
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  
  // Career & Goals
  goals: GoalType[];
  careerFocus: CareerFocus[];
  careerLevel: CareerLevel; // Now allows null
  
  // Skills & Interests
  currentSkills: string[];
  desiredSkills: string[];
  
  // Preferences
  trackingPreferences: TrackingPreference[];
  courseInterest: boolean;
  courseCategories?: CourseCategory[];
  jobRecommendations: boolean;
  assessmentInterest: boolean;

  // Subscription
  selectedPlanId: string | null;
}