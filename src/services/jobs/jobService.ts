import { supabase } from '../../lib/supabase';
import type { Job } from '../../types/job';
import { mockJobs } from '../../data/mockJobs';

// In a real app, this would fetch from the API
export async function getJobs(): Promise<Job[]> {
  // Simulating API call
  return Promise.resolve(mockJobs);
}

export async function getJobById(id: string): Promise<Job | undefined> {
  return mockJobs.find(job => job.id === id);
}

export async function getJobDescription(jobId: string) {
  try {
    const { data, error } = await supabase
      .from('job_descriptions')
      .select('*')
      .eq('job_id', jobId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching job description:', error);
    return null;
  }
}