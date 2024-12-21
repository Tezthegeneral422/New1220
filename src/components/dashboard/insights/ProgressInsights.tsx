import React from 'react';
import { TrendingUp, Award, Target } from 'lucide-react';

export function ProgressInsights() {
  return (
    <div className="p-6">
      <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Progress Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InsightCard
          icon={<TrendingUp className="h-6 w-6 text-button-primary" />}
          title="Skills Growth"
          value="+15%"
          description="Past 30 days"
        />
        <InsightCard
          icon={<Award className="h-6 w-6 text-button-primary" />}
          title="Completed Courses"
          value="3"
          description="This month"
        />
        <InsightCard
          icon={<Target className="h-6 w-6 text-button-primary" />}
          title="Goals Progress"
          value="80%"
          description="On track"
        />
      </div>
    </div>
  );
}

function InsightCard({ 
  icon, 
  title, 
  value, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  description: string;
}) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-background-card rounded-lg border border-white dark:border-gray-700">
      <div className="flex items-center space-x-3">
        {icon}
        <div>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-300">{title}</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-[10px] text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
}