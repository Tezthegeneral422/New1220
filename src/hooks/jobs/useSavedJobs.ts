import { useState } from 'react';
import { toast } from 'react-hot-toast';
import type { SavedJob } from '../../types/savedJobs';
import type { Job } from '../../types/job';

export function useSavedJobs() {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);

  const saveJob = (job: Job) => {
    setSavedJobs(prev => {
      if (prev.some(saved => saved.jobId === job.id)) {
        toast.error('Job already saved');
        return prev;
      }

      toast.success('Job saved successfully');
      return [...prev, {
        id: crypto.randomUUID(),
        jobId: job.id,
        savedAt: new Date(),
        status: 'saved'
      }];
    });
  };

  const updateJobStatus = (savedJobId: string, status: SavedJob['status']) => {
    setSavedJobs(prev =>
      prev.map(job =>
        job.id === savedJobId
          ? { ...job, status }
          : job
      )
    );
    toast.success('Job status updated');
  };

  const updateJobNotes = (savedJobId: string, notes: string) => {
    setSavedJobs(prev =>
      prev.map(job =>
        job.id === savedJobId
          ? { ...job, notes }
          : job
      )
    );
    toast.success('Notes updated');
  };

  const removeJob = (savedJobId: string) => {
    setSavedJobs(prev => prev.filter(job => job.id !== savedJobId));
    toast.success('Job removed from saved list');
  };

  return {
    savedJobs,
    saveJob,
    updateJobStatus,
    updateJobNotes,
    removeJob
  };
}