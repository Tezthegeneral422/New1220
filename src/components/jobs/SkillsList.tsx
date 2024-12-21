import React from 'react';
import { Code, Users } from 'lucide-react';

interface SkillsListProps {
  technicalSkills: string[];
  softSkills: string[];
}

export function SkillsList({ technicalSkills, softSkills }: SkillsListProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Code className="h-3 w-3 text-gray-700" />
        <div className="flex flex-wrap gap-1.5">
          {technicalSkills.map((skill) => (
            <span
              key={skill}
              className="px-1.5 py-0.5 bg-gray-700 text-white text-xs rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Users className="h-3 w-3 text-gray-700" />
        <div className="flex flex-wrap gap-1.5">
          {softSkills.map((skill) => (
            <span
              key={skill}
              className="px-1.5 py-0.5 bg-gray-700 text-white text-xs rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}