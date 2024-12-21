import React, { useState } from 'react';
import { Pencil, Trash2, X } from 'lucide-react';
import type { SavedJob } from '../../../types/savedJobs';
import type { Job } from '../../../types/job';
import { JobStatusBadge } from './JobStatusBadge';

interface SavedJobCardProps {
  savedJob: SavedJob;
  jobDetails: Job;
  onUpdateStatus: (id: string, status: SavedJob['status']) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onRemove: (id: string) => void;
}

export function SavedJobCard({
  savedJob,
  jobDetails,
  onUpdateStatus,
  onUpdateNotes,
  onRemove
}: SavedJobCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(savedJob.notes || '');

  const handleNotesSubmit = () => {
    onUpdateNotes(savedJob.id, notes);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <img
              src={jobDetails.logo}
              alt={`${jobDetails.company} logo`}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{jobDetails.title}</h3>
              <p className="text-gray-600">{jobDetails.company}</p>
              <div className="mt-2 flex items-center space-x-4">
                <p className="text-sm text-gray-500">{jobDetails.location}</p>
                <p className="text-sm text-gray-500">{jobDetails.type}</p>
                <p className="text-sm text-gray-500">{jobDetails.salary}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={savedJob.status}
              onChange={(e) => onUpdateStatus(savedJob.id, e.target.value as SavedJob['status'])}
              className="rounded-md border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="saved">Saved</option>
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="offered">Offered</option>
              <option value="rejected">Rejected</option>
            </select>
            <JobStatusBadge status={savedJob.status} />
          </div>
        </div>

        <div className="mt-4">
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                rows={3}
                placeholder="Add notes about this job..."
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNotesSubmit}
                  className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Save Notes
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between">
              <p className="text-gray-600 text-sm">
                {savedJob.notes || 'No notes added yet'}
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onRemove(savedJob.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}