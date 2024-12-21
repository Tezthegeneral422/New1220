import { useState, useMemo } from 'react';
import type { Job } from '../../types/job';

interface JobFilters {
  type: string[];
  experience: string[];
  location: string[];
  salary: string[];
  search: string;
}

const initialFilters: JobFilters = {
  type: [],
  experience: [],
  location: [],
  salary: [],
  search: ''
};

export function useJobFilters(jobs: Job[]) {
  const [filters, setFilters] = useState<JobFilters>(initialFilters);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch = 
          job.title.toLowerCase().includes(searchTerm) ||
          job.company.toLowerCase().includes(searchTerm) ||
          job.location.toLowerCase().includes(searchTerm);
        
        if (!matchesSearch) return false;
      }

      // Type filter
      if (filters.type.length > 0 && !filters.type.includes(job.type)) {
        return false;
      }

      // Location filter
      if (filters.location.length > 0) {
        const matchesLocation = filters.location.some(loc => {
          if (loc === 'Remote') return job.location.toLowerCase().includes('remote');
          if (loc === 'Hybrid') return job.location.toLowerCase().includes('hybrid');
          if (loc === 'On-site') return !job.location.toLowerCase().includes('remote') && 
                                      !job.location.toLowerCase().includes('hybrid');
          return true;
        });
        if (!matchesLocation) return false;
      }

      // Salary filter
      if (filters.salary.length > 0) {
        const salary = parseInt(job.salary.replace(/[^0-9]/g, ''));
        const matchesSalary = filters.salary.some(range => {
          if (range === '$0-50k') return salary <= 50000;
          if (range === '$50k-100k') return salary > 50000 && salary <= 100000;
          if (range === '$100k-150k') return salary > 100000 && salary <= 150000;
          if (range === '$150k+') return salary > 150000;
          return true;
        });
        if (!matchesSalary) return false;
      }

      return true;
    });
  }, [jobs, filters]);

  const updateFilters = (filterType: keyof JobFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return {
    filters,
    filteredJobs,
    updateFilters,
    resetFilters
  };
}