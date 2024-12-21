import React from 'react';
import { MatchIndicator } from '../MatchIndicator';

interface JobCardHeaderProps {
  title: string;
  company: string;
  logo: string;
  matchPercentage: number;
}

export function JobCardHeader({ title, company, logo, matchPercentage }: JobCardHeaderProps) {
  return (
    <div className="flex items-start gap-4">
      <img
        src={logo}
        alt={`${company} logo`}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{company}</p>
          </div>
          <MatchIndicator percentage={matchPercentage} />
        </div>
      </div>
    </div>
  );
}