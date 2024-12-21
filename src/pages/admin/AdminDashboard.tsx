import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Settings } from 'lucide-react';

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link 
            to="/admin/courses" 
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Courses</h2>
                <p className="text-sm text-gray-500">Manage course content</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/admin/skills" 
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
                <p className="text-sm text-gray-500">Manage available skills</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/admin/users" 
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Users</h2>
                <p className="text-sm text-gray-500">Manage user accounts</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/admin/settings" 
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <Settings className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
                <p className="text-sm text-gray-500">Configure platform settings</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}