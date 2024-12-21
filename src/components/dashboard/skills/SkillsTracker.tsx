import React from 'react';
import { SkillProgress } from './SkillProgress';
import { SkillSuggestions } from './SkillSuggestions';

export function SkillsTracker() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills Tracker</h2>
      <SkillProgress />
      <SkillSuggestions />
    </div>
  );
}