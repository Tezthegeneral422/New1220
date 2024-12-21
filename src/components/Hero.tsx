import React from 'react';
import { ArrowRight, BookOpen, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <div className="relative bg-gray-50 dark:bg-background-dark overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-gray-50 dark:bg-background-dark sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block">Take control of your</span>
                <span className="block text-button-primary">personal growth</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Track your skills, build powerful routines, and advance your career with TEZHLY's comprehensive platform for personal and professional development.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <Link
                  to="/create-account"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-button-primary hover:opacity-90 md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
              <FeatureCard
                icon={<BookOpen className="h-8 w-8 text-button-primary" />}
                title="Course Marketplace"
                description="Access curated courses designed to enhance your skills and advance your career."
              />
              <FeatureCard
                icon={<Briefcase className="h-8 w-8 text-button-primary" />}
                title="Job Board"
                description="Discover opportunities that align with your skills and career aspirations."
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-white dark:bg-background-card rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}