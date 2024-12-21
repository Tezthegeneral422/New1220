import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import type { Job } from '../types/job';

export async function submitJobApplication(job: Job, coverLetter: string, resumeUrl: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('You must be logged in to apply for jobs');
    }

    const { error } = await supabase
      .from('job_applications')
      .insert({
        user_id: user.id,
        job_id: job.id,
        status: 'pending',
        cover_letter: coverLetter,
        resume_url: resumeUrl
      });

    if (error) throw error;
    
    toast.success('Application submitted successfully!');
    return true;
  } catch (error: any) {
    console.error('Application submission error:', error);
    toast.error(error.message);
    return false;
  }
}