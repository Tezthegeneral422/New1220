import React from 'react';
import { DashboardGreeting } from '../components/dashboard/DashboardGreeting';
import { UserSkills } from '../components/dashboard/skills/UserSkills';
import { DailyScheduleBuilder } from '../components/dashboard/scheduler/DailyScheduleBuilder';
import { CourseRecommendations } from '../components/dashboard/courses/CourseRecommendations';
import { MyCourses } from '../components/dashboard/courses/MyCourses';
import { JobMatches } from '../components/dashboard/jobs/JobMatches';
import { ProgressInsights } from '../components/dashboard/insights/ProgressInsights';
import { SavedContent } from '../components/dashboard/saved/SavedContent';
import { QuickActions } from '../components/dashboard/widgets/QuickActions';
import { GoalsWidget } from '../components/dashboard/widgets/goals/GoalsWidget';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardGreeting />
        
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <UserSkills />
              </div>
              <div className="card">
                <DailyScheduleBuilder />
              </div>
            </div>
            <div className="card">
              <ProgressInsights />
            </div>
            <div className="card">
              <MyCourses />
            </div>
            <div className="card">
              <CourseRecommendations />
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="card">
              <QuickActions />
            </div>
            <div className="card">
              <GoalsWidget />
            </div>
            <div className="card">
              <JobMatches />
            </div>
            <div className="card">
              <SavedContent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}