import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trophy, ArrowRight, GraduationCap } from 'lucide-react';
import type { Course } from '../types/course';

interface LocationState {
  course: Course;
  acquiredSkills: { name: string; level: string }[];
}

export function CourseCompletion() {
  const navigate = useNavigate();
  const location = useLocation();
  const { course, acquiredSkills } = location.state as LocationState;

  // Auto-redirect to dashboard after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <Trophy className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Course Completed!
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Congratulations on completing {course.title}
          </p>
        </div>

        <div className="mt-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-indigo-600" />
              Skills Acquired
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {acquiredSkills.map(({ name, level }) => (
                <div 
                  key={name}
                  className="flex items-center justify-between py-2"
                >
                  <span className="font-medium text-gray-900">{name}</span>
                  <span className="text-sm text-gray-600 capitalize">{level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <p className="mt-2 text-sm text-gray-500 text-center">
            Automatically returning to dashboard in 5 seconds...
          </p>
        </div>
      </div>
    </div>
  );
}