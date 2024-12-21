import React from 'react';
import { JobCard } from './JobCard';
import { useJobAccess } from '../../hooks/jobs/useJobAccess';
import { useSubscriptionCheck } from '../../hooks/subscriptions/useSubscriptionCheck';
import { UpgradePrompt } from '../auth/UpgradePrompt';
import type { Job } from '../../types/job';

interface JobListProps {
  jobs: Job[];
}

export function JobList({ jobs }: JobListProps) {
  const { getAccessibleJobs } = useJobAccess();
  const { isPaidUser } = useSubscriptionCheck();
  const accessibleJobs = getAccessibleJobs(jobs);

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No jobs found matching your criteria</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accessibleJobs.map((job) => (
          <JobCard 
            key={job.id} 
            {...job} 
            isAccessible={job.isAccessible}
          />
        ))}
      </div>

      {!isPaidUser && (
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Unlock All Job Listings
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Upgrade to a paid plan to access all job listings and advanced features
          </p>
          <UpgradePrompt feature="job-board" />
        </div>
      )}
    </div>
  );
}