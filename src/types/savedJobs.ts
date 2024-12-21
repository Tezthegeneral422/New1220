export interface SavedJob {
  id: string;
  jobId: string;
  savedAt: Date;
  notes?: string;
  status: 'saved' | 'applied' | 'interviewing' | 'offered' | 'rejected';
}