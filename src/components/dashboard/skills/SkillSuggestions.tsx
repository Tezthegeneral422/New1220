import React from 'react';
import { Sparkles } from 'lucide-react';

export function SkillSuggestions() {
  const suggestions = [
    { skill: 'AWS', reason: 'Popular in job listings' },
    { skill: 'Node.js', reason: 'Complements your JavaScript skills' },
    { skill: 'GraphQL', reason: 'Growing demand in frontend roles' },
  ];

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Suggested Skills</h3>
      <div className="space-y-3">
        {suggestions.map(({ skill, reason }) => (
          <div key={skill} className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-lg">
            <Sparkles className="h-5 w-5 text-indigo-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">{skill}</h4>
              <p className="text-sm text-gray-600">{reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}