import React, { useState } from 'react';
import { X, Upload, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { submitJobApplication } from '../../services/jobApplications';
import type { Job } from '../../types/job';

interface ApplicationModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

export function ApplicationModal({ job, isOpen, onClose }: ApplicationModalProps) {
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!coverLetter.trim()) {
      toast.error('Please write a cover letter');
      return;
    }

    if (!resumeFile) {
      toast.error('Please upload your resume');
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, first upload the resume file to storage
      const resumeUrl = 'placeholder-url'; // Replace with actual file upload
      
      const success = await submitJobApplication(job, coverLetter, resumeUrl);
      if (success) {
        onClose();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-background-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Apply to {job.title} at {job.company}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cover Letter
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full h-40 input"
              placeholder="Why are you a great fit for this role?"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Resume
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                className="hidden"
                id="resume"
                required
              />
              <label
                htmlFor="resume"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">
                  {resumeFile ? resumeFile.name : 'Upload your resume (PDF, DOC, DOCX)'}
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin h-4 w-4 mr-2" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}