import React from 'react';
import { MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';

interface JobCardDetailsProps {
  location: string;
  type: string;
  salary: string;
  postedAt: string;
}

export function JobCardDetails({ location, type, salary, postedAt }: JobCardDetailsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
      <div className="flex items-center gap-1">
        <MapPin className="h-4 w-4" />
        <span>{location}</span>
      </div>
      <div className="flex items-center gap-1">
        <Briefcase className="h-4 w-4" />
        <span>{type}</span>
      </div>
      <div className="flex items-center gap-1">
        <DollarSign className="h-4 w-4" />
        <span>{salary}</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock className="h-4 w-4" />
        <span>{postedAt}</span>
      </div>
    </div>
  );
}