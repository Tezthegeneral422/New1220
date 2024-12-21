import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Job } from '../../types/job';

export function useJobApplication() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const openApplication = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeApplication = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return {
    isModalOpen,
    selectedJob,
    openApplication,
    closeApplication
  };
}