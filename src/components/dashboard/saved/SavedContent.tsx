import React from 'react';
import { Bookmark, Briefcase, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SavedContent() {
  const navigate = useNavigate();

  const handleViewSavedJobs = () => {
    navigate('/saved/jobs');
  };

  const handleViewSavedCourses = () => {
    navigate('/saved/courses');
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Saved Items</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-background-card rounded-lg">
          <div className="flex items-center space-x-3">
            <Briefcase className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Saved Jobs</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">5 jobs saved</p>
            </div>
          </div>
          <button 
            onClick={handleViewSavedJobs}
            className="text-button-primary hover:opacity-80 text-sm font-medium"
          >
            View All
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-background-card rounded-lg">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Saved Courses</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">3 courses saved</p>
            </div>
          </div>
          <button 
            onClick={handleViewSavedCourses}
            className="text-button-primary hover:opacity-80 text-sm font-medium"
          >
            View All
          </button>
        </div>
      </div>
    </div>
  );
}