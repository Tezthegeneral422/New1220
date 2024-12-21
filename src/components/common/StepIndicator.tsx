import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center space-x-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <div 
                className={`h-0.5 w-10 ${
                  stepNumber <= currentStep ? 'bg-gray-400 dark:bg-gray-400' : 'bg-gray-200 dark:bg-gray-600'
                }`} 
              />
            )}
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${isCompleted ? 'bg-gray-400 dark:bg-gray-400' : isActive ? 'bg-gray-400 dark:bg-gray-400' : 'bg-gray-200 dark:bg-gray-600'}
              `}
            >
              {isCompleted ? (
                <Check className="h-5 w-5 text-white" />
              ) : (
                <span className={`text-sm ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                  {stepNumber}
                </span>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}