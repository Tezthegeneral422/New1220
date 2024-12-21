import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CourseFilters } from '../components/courses/marketplace/CourseFilters';
import { CourseGrid } from '../components/courses/marketplace/CourseGrid';
import { CourseSearch } from '../components/courses/marketplace/CourseSearch';

export function CourseMarketplace() {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-button-primary hover:opacity-80"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Course Marketplace</h1>
          <p className="mt-2 text-lg text-gray-400">
            Discover courses to advance your skills and career
          </p>
        </div>

        <div className="mb-6">
          <CourseSearch />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <CourseFilters />
          </div>
          <div className="lg:col-span-9">
            <CourseGrid />
          </div>
        </div>
      </div>
    </div>
  );
}