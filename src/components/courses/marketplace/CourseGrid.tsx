import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Trophy, BookOpen } from 'lucide-react';
import { mockCourses } from '../../../data/mockCourses';

export function CourseGrid() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockCourses.map((course) => (
        <div
          key={course.id}
          onClick={() => navigate(`/courses/${course.id}`)}
          className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer border border-gray-800"
        >
          <div className="relative h-48">
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
            <p className="text-gray-400 text-sm line-clamp-2 mb-4">
              {course.description}
            </p>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-400">
                <BookOpen className="h-4 w-4 mr-2" />
                {course.provider}
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Clock className="h-4 w-4 mr-2" />
                {course.duration}
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Trophy className="h-4 w-4 mr-2" />
                {course.level}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {course.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}