import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SavedJobsList } from '../components/jobs/saved/SavedJobsList';
import { SavedJobsFilters } from '../components/jobs/saved/SavedJobsFilters';

export function SavedJobs() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Saved Jobs</h1>
          <p className="mt-2 text-lg text-gray-600">Track and manage your job applications</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <SavedJobsFilters />
          </div>
          <div className="lg:col-span-9">
            <SavedJobsList />
          </div>
        </div>
      </div>
    </div>
  );
}