import React from 'react';
import { BookOpen, Bell, Brain } from 'lucide-react';
import type { OnboardingData, TrackingPreference, CourseCategory } from '../../../types/onboarding';

type PreferencesStepProps = Pick<OnboardingData, 
  'trackingPreferences' | 
  'courseInterest' | 
  'courseCategories' | 
  'jobRecommendations' | 
  'assessmentInterest'
> & {
  updateFields: (fields: Partial<OnboardingData>) => void;
};

const TRACKING_OPTIONS: { value: TrackingPreference; label: string }[] = [
  { value: 'productivity', label: 'Daily productivity routines' },
  { value: 'skills', label: 'Skill-building habits' },
  { value: 'work-life', label: 'Work-life balance activities' },
];

const COURSE_CATEGORIES: { value: CourseCategory; label: string; icon: React.ReactNode }[] = [
  { value: 'leadership', label: 'Leadership', icon: <Brain className="h-5 w-5" /> },
  { value: 'tech', label: 'Technical Skills', icon: <BookOpen className="h-5 w-5" /> },
  { value: 'soft-skills', label: 'Soft Skills', icon: <Bell className="h-5 w-5" /> },
];

export function PreferencesStep({
  trackingPreferences,
  courseInterest,
  courseCategories = [],
  jobRecommendations,
  assessmentInterest,
  updateFields,
}: PreferencesStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          What would you like to track?
        </h3>
        <div className="space-y-3">
          {TRACKING_OPTIONS.map(({ value, label }) => (
            <label key={value} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={trackingPreferences.includes(value)}
                onChange={(e) => {
                  const newPrefs = e.target.checked
                    ? [...trackingPreferences, value]
                    : trackingPreferences.filter(p => p !== value);
                  updateFields({ trackingPreferences: newPrefs });
                }}
                className="h-4 w-4 text-button-primary rounded border-gray-300 dark:border-gray-600 focus:ring-button-primary"
              />
              <span className="text-gray-700 dark:text-white">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={courseInterest}
              onChange={(e) => {
                updateFields({ courseInterest: e.target.checked });
                if (!e.target.checked) {
                  updateFields({ courseCategories: [] });
                }
              }}
              className="h-4 w-4 text-button-primary rounded border-gray-300 dark:border-gray-600 focus:ring-button-primary"
            />
            <span className="text-gray-700 dark:text-white">I'm interested in taking courses to upskill</span>
          </label>
        </div>

        {courseInterest && (
          <div className="ml-7 space-y-3">
            {COURSE_CATEGORIES.map(({ value, label, icon }) => (
              <label key={value} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={courseCategories.includes(value)}
                  onChange={(e) => {
                    const newCategories = e.target.checked
                      ? [...courseCategories, value]
                      : courseCategories.filter(c => c !== value);
                    updateFields({ courseCategories: newCategories });
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
        )}
      </div>

      <div>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={jobRecommendations}
            onChange={(e) => updateFields({ jobRecommendations: e.target.checked })}
            className="h-4 w-4 text-button-primary rounded border-gray-300 dark:border-gray-600 focus:ring-button-primary"
          />
          <span className="text-gray-700 dark:text-white">
            I'd like to receive job recommendations based on my skills
          </span>
        </label>
      </div>

      <div>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={assessmentInterest}
            onChange={(e) => updateFields({ assessmentInterest: e.target.checked })}
            className="h-4 w-4 text-button-primary rounded border-gray-300 dark:border-gray-600 focus:ring-button-primary"
          />
          <span className="text-gray-700 dark:text-white">
            I'm interested in taking skills assessments to enhance my recommendations
          </span>
        </label>
      </div>
    </div>
  );
}