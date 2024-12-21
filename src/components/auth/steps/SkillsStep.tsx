import React from 'react';
import type { OnboardingData } from '../../../types/onboarding';

type SkillsStepProps = Pick<OnboardingData, 'currentSkills' | 'desiredSkills'> & {
  updateFields: (fields: Partial<OnboardingData>) => void;
};

const SUGGESTED_SKILLS = [
  'JavaScript', 'Python', 'React', 'Node.js',
  'Product Management', 'UI/UX Design',
  'Data Analysis', 'Digital Marketing',
  'Leadership', 'Communication'
];

export function SkillsStep({ currentSkills, desiredSkills, updateFields }: SkillsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          What skills do you currently have?
        </h3>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_SKILLS.map((skill) => (
              <label
                key={skill}
                className={`inline-flex items-center px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                  currentSkills.includes(skill)
                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={currentSkills.includes(skill)}
                  onChange={(e) => {
                    const newSkills = e.target.checked
                      ? [...currentSkills, skill]
                      : currentSkills.filter(s => s !== skill);
                    updateFields({ currentSkills: newSkills });
                  }}
                />
                {skill}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          What skills would you like to develop?
        </h3>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_SKILLS.map((skill) => (
              <label
                key={skill}
                className={`inline-flex items-center px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                  desiredSkills.includes(skill)
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={desiredSkills.includes(skill)}
                  onChange={(e) => {
                    const newSkills = e.target.checked
                      ? [...desiredSkills, skill]
                      : desiredSkills.filter(s => s !== skill);
                    updateFields({ desiredSkills: newSkills });
                  }}
                />
                {skill}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}