import React from 'react';
import { JobFilters } from '../components/jobs/JobFilters';
import { JobList } from '../components/jobs/JobList';
import { JobSearch } from '../components/jobs/JobSearch';
import { useJobFilters } from '../hooks/jobs/useJobFilters';
import { mockJobs } from '../data/mockJobs';

export function JobBoard() {
  const {
    filters,
    filteredJobs,
    updateFilters,
    resetFilters
  } = useJobFilters(mockJobs);

  const handleSearchChange = (query: string) => {
    updateFilters('search', query);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Find Your Next Opportunity</h1>
          <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">Discover jobs that match your skills and experience</p>
        </div>
        
        <div className="mb-6">
          <JobSearch 
            searchQuery={filters.search}
            onSearchChange={handleSearchChange}
          />
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3">
            <JobFilters 
              filters={filters}
              onFilterChange={updateFilters}
              onReset={resetFilters}
            />
          </div>
          <div className="lg:col-span-9">
            <JobList jobs={filteredJobs} />
          </div>
        </div>
      </div>
    </div>
  );
}