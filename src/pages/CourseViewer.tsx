import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Trophy } from 'lucide-react';
import { mockCourses } from '../data/mockCourses';

export function CourseViewer() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = mockCourses.find(c => c.id === courseId);

  const handleBeginCourse = () => {
    navigate(`/courses/${courseId}/learn`);
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
            <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-700 mt-4 inline-block">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-64 sm:h-96">
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="mt-2 text-lg">{course.description}</p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center space-x-2 text-gray-600">
                <BookOpen className="h-5 w-5" />
                <span>{course.provider}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Trophy className="h-5 w-5" />
                <span>{course.level}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Skills You'll Learn</h2>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <button 
                  onClick={handleBeginCourse}
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Begin Course
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}