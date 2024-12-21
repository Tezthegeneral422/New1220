import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CourseProgressList } from './CourseProgressList';
import { useCourseProgress } from '../../../hooks/courses/useCourseProgress';

export function MyCourses() {
  const { modules, getProgress } = useCourseProgress([]);

  return (
    <div className="p-6 border border-white dark:border-gray-700 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-4 w-4 text-button-primary" />
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">My Courses</h2>
        </div>
        <Link
          to="/courses"
          className="text-button-primary hover:opacity-80 text-sm font-medium flex items-center"
        >
          Browse Courses
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <CourseProgressList />
    </div>
  );
}