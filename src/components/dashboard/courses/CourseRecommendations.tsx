import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Trophy, BookOpen } from 'lucide-react';

export function CourseRecommendations() {
  const navigate = useNavigate();

  const courses = [
    {
      id: '1',
      title: 'Advanced React Patterns',
      provider: 'Frontend Masters',
      duration: '6 hours',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      title: 'AWS Fundamentals',
      provider: 'Cloud Guru',
      duration: '8 hours',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleStartCourse = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recommended Courses</h2>
        <button 
          onClick={() => navigate('/courses')}
          className="text-button-primary hover:opacity-80 text-sm font-medium"
        >
          View All Courses
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="flex flex-col border dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-gray-50 dark:bg-[#222121]"
          >
            <div className="relative h-48">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-semibold text-white">{course.title}</h3>
              </div>
            </div>
            <div className="p-4 flex-grow">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <BookOpen className="h-4 w-4 mr-2" />
                  {course.provider}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Clock className="h-4 w-4 mr-2" />
                  {course.duration}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Trophy className="h-4 w-4 mr-2" />
                  {course.level}
                </div>
              </div>
              <button 
                onClick={() => handleStartCourse(course.id)}
                className="mt-4 w-full btn-primary"
              >
                Start Learning
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}