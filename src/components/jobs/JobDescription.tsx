import React from 'react';
import { CheckCircle, Award, Coffee } from 'lucide-react';

interface JobDescriptionProps {
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
}

export function JobDescription({ description, requirements, responsibilities, benefits }: JobDescriptionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">About the Role</h3>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{description}</p>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          Requirements
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          {requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center">
          <Award className="h-5 w-5 text-indigo-500 mr-2" />
          Responsibilities
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          {responsibilities.map((resp, index) => (
            <li key={index}>{resp}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center">
          <Coffee className="h-5 w-5 text-orange-500 mr-2" />
          Benefits
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          {benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}