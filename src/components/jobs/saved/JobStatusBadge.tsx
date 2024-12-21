import React from 'react';
import type { SavedJob } from '../../../types/savedJobs';

const STATUS_STYLES = {
  saved: 'bg-gray-100 text-gray-800',
  applied: 'bg-blue-100 text-blue-800',
  interviewing: 'bg-yellow-100 text-yellow-800',
  offered: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

interface JobStatusBadgeProps {
  status: SavedJob['status'];
}

export function JobStatusBadge({ status }: JobStatusBadgeProps) {
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${STATUS_STYLES[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}