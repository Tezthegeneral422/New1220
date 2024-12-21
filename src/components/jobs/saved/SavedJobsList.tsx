import React from 'react';
import { SavedJobCard } from './SavedJobCard';
import { useSavedJobs } from '../../../hooks/jobs/useSavedJobs';
import { mockJobs } from '../../../data/mockJobs';

export function SavedJobsList() {
  const { savedJobs, updateJobStatus, updateJobNotes, removeJob } = useSavedJobs();

  const savedJobsWithDetails = savedJobs.map(savedJob => ({
    ...savedJob,
    details: mockJobs.find(job => job.id === savedJob.jobId)!
  }));

  if (savedJobs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">No saved jobs yet. Start saving jobs you're interested in!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {savedJobsWithDetails.map(savedJob => (
        <SavedJobCard
          key={savedJob.id}
          savedJob={savedJob}
          jobDetails={savedJob.details}
          onUpdateStatus={updateJobStatus}
          onUpdateNotes={updateJobNotes}
          onRemove={removeJob}
        />
      ))}
    </div>
  );
}