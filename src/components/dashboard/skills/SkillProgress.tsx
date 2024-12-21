import React from 'react';
import { CircularProgress } from '../../common/CircularProgress';

export function SkillProgress() {
  const skills = [
    { name: 'JavaScript', progress: 75 },
    { name: 'React', progress: 60 },
    { name: 'TypeScript', progress: 45 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {skills.map((skill) => (
        <div key={skill.name} className="flex items-center space-x-4">
          <CircularProgress progress={skill.progress} />
          <div>
            <h3 className="font-medium text-gray-900">{skill.name}</h3>
            <p className="text-sm text-gray-500">{skill.progress}% mastered</p>
          </div>
        </div>
      ))}
    </div>
  );
}