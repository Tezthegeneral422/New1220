import React from 'react';
import { Filter } from 'lucide-react';

export function CourseFilters() {
  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <h2 className="text-lg font-medium text-white">Filters</h2>
      </div>

      <div className="space-y-6">
        <FilterSection
          title="Level"
          options={['Beginner', 'Intermediate', 'Advanced']}
        />

        <FilterSection
          title="Duration"
          options={['0-2 hours', '2-5 hours', '5-10 hours', '10+ hours']}
        />

        <FilterSection
          title="Skills"
          options={['JavaScript', 'React', 'Python', 'UI/UX Design', 'Marketing']}
        />
      </div>
    </div>
  );
}

function FilterSection({ title, options }: { title: string; options: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-white mb-2">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-700 text-button-primary focus:ring-button-primary bg-gray-800"
            />
            <span className="ml-2 text-sm text-gray-400">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}