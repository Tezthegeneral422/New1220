import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Trophy } from 'lucide-react';
import { mockCourses } from '../../../data/mockCourses';

export function CourseProgressList() {
  const navigate = useNavigate();
  const inProgressCourses = mockCourses.slice(0, 2).map(course => ({
    ...course,
    progress: Math.floor(Math.random() * 100)
  }));

  if (inProgressCourses.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No courses in progress. Start learning today!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {inProgressCourses.map((course) => (
        <div
          key={course.id}
          onClick={() => navigate(`/courses/${course.id}/learn`)}
          className="bg-gray-50 dark:bg-background-card rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-start space-x-3">
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-grow min-w-0">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {course.title}
              </h3>
              <div className="mt-1 flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Trophy className="h-3 w-3 mr-1" />
                  {course.level}
                </div>
              </div>
              <div className="mt-2">
                <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-button-primary rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="mt-1 flex justify-end">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {course.progress}% Complete
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}