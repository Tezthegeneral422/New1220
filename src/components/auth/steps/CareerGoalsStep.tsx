import React from 'react';
import { Briefcase, BookOpen, Clock } from 'lucide-react';
import type { OnboardingData, GoalType, CareerFocus, CareerLevel } from '../../../types/onboarding';

type CareerGoalsProps = Pick<OnboardingData, 'goals' | 'careerFocus' | 'careerLevel'> & {
  updateFields: (fields: Partial<OnboardingData>) => void;
};

const GOALS: { value: GoalType; label: string; icon: React.ReactNode }[] = [
  { value: 'upskilling', label: 'Upskilling for career advancement', icon: <BookOpen className="h-5 w-5" /> },
  { value: 'routines', label: 'Tracking daily routines and habits', icon: <Clock className="h-5 w-5" /> },
  { value: 'career', label: 'Discovering career opportunities', icon: <Briefcase className="h-5 w-5" /> },
];

const CAREER_FOCUSES: { value: CareerFocus; label: string }[] = [
  { value: 'technology', label: 'Technology' },
  { value: 'business', label: 'Business' },
  { value: 'creative', label: 'Creative' },
];

const CAREER_LEVELS: { value: CareerLevel; label: string }[] = [
  { value: null, label: 'Select Level' },
  { value: 'entry', label: 'Entry-Level' },
  { value: 'mid', label: 'Mid-Level' },
  { value: 'senior', label: 'Senior-Level' },
  { value: 'transitioning', label: 'Career Transitioning' },
];

export function CareerGoalsStep({ goals, careerFocus, careerLevel, updateFields }: CareerGoalsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          What are your primary goals?
        </h3>
        <div className="space-y-3">
          {GOALS.map(({ value, label, icon }) => (
            <label key={value} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={goals.includes(value)}
                onChange={(e) => {
                  const newGoals = e.target.checked
                    ? [...goals, value]
                    : goals.filter(g => g !== value);
                  updateFields({ goals: newGoals });
                }}
                className="h-4 w-4 text-button-primary rounded border-gray-300 dark:border-gray-600 focus:ring-button-primary"
              />
              <div className="flex items-center space-x-2">
                <span className="text-button-primary">{icon}</span>
                <span className="text-gray-700 dark:text-white">{label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          What's your career focus?
        </h3>
        <div className="space-y-3">
          {CAREER_FOCUSES.map(({ value, label }) => (
            <label key={value} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={careerFocus.includes(value)}
                onChange={(e) => {
                  const newFocus = e.target.checked
                    ? [...careerFocus, value]
                    : careerFocus.filter(f => f !== value);
                  updateFields({ careerFocus: newFocus });
                }}
                className="h-4 w-4 text-button-primary rounded border-gray-300 dark:border-gray-600 focus:ring-button-primary"
              />
              <span className="text-gray-700 dark:text-white">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          What's your current career level?
        </h3>
        <select
          value={careerLevel || ''}
          onChange={(e) => {
            const value = e.target.value === '' ? null : e.target.value as CareerLevel;
            updateFields({ careerLevel: value });
          }}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-button-primary focus:ring-button-primary bg-white dark:bg-gray-700 dark:text-white"
        >
          {CAREER_LEVELS.map(({ value, label }) => (
            <option key={label} value={value || ''}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}