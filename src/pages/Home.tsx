import React from 'react';
import { Hero } from '../components/Hero';
import { FeaturedCourses } from '../components/courses/FeaturedCourses';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark transition-colors">
      <Hero />
      <FeaturedCourses />
    </div>
  );
}