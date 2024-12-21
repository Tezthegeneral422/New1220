import React from 'react';
import { Filter } from 'lucide-react';

export function SavedJobsFilters() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
          {['All', 'Saved', 'Applied', 'Interviewing', 'Offered', 'Rejected'].map((status) => (
            <label key={status} className="flex items-center mt-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">{status}</span>
            </label>
          ))}
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Date Saved</h3>
          {['Last 7 days', 'Last 30 days', 'Last 3 months', 'All time'].map((timeframe) => (
            <label key={timeframe} className="flex items-center mt-2">
              <input
                type="radio"
                name="timeframe"
                className="border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">{timeframe}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}