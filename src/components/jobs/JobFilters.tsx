import React from 'react';
import { Briefcase, Clock, MapPin, DollarSign, X } from 'lucide-react';

interface JobFiltersProps {
  filters: {
    type: string[];
    experience: string[];
    location: string[];
    salary: string[];
  };
  onFilterChange: (filterType: string, values: string[]) => void;
  onReset: () => void;
}

export function JobFilters({ filters, onFilterChange, onReset }: JobFiltersProps) {
  const handleFilterChange = (type: string, value: string) => {
    const currentFilters = filters[type as keyof typeof filters] || [];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(v => v !== value)
      : [...currentFilters, value];
    
    onFilterChange(type, newFilters);
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter.length > 0);

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center"
          >
            <X className="h-3 w-3 mr-1" />
            Reset
          </button>
        )}
      </div>
      
      <div className="space-y-6">
        <FilterSection
          title="Job Type"
          icon={<Briefcase className="h-4 w-4 text-gray-400" />}
          options={['Full-time', 'Part-time', 'Contract', 'Remote']}
          selected={filters.type}
          onChange={value => handleFilterChange('type', value)}
        />
        
        <FilterSection
          title="Experience Level"
          icon={<Clock className="h-4 w-4 text-gray-400" />}
          options={['Entry Level', 'Mid Level', 'Senior Level', 'Lead']}
          selected={filters.experience}
          onChange={value => handleFilterChange('experience', value)}
        />
        
        <FilterSection
          title="Location"
          icon={<MapPin className="h-4 w-4 text-gray-400" />}
          options={['Remote', 'Hybrid', 'On-site']}
          selected={filters.location}
          onChange={value => handleFilterChange('location', value)}
        />
        
        <FilterSection
          title="Salary Range"
          icon={<DollarSign className="h-4 w-4 text-gray-400" />}
          options={['$0-50k', '$50k-100k', '$100k-150k', '$150k+']}
          selected={filters.salary}
          onChange={value => handleFilterChange('salary', value)}
        />
      </div>
    </div>
  );
}

interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
}

function FilterSection({ title, icon, options, selected, onChange }: FilterSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-xs font-medium text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onChange(option)}
              className="rounded border-gray-300 dark:border-gray-600 text-button-primary focus:ring-button-primary"
            />
            <span className="ml-2 text-xs text-gray-600 dark:text-gray-300">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}