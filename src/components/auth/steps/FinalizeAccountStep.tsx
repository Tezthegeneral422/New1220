import React from 'react';
import { User } from 'lucide-react';
import type { OnboardingData } from '../../../types/onboarding';

type FinalizeAccountProps = Pick<OnboardingData, 'firstName' | 'lastName'> & {
  updateFields: (fields: Partial<OnboardingData>) => void;
};

export function FinalizeAccountStep({ firstName, lastName, updateFields }: FinalizeAccountProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Almost there! Tell us your name
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              First Name
            </label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={e => updateFields({ firstName: e.target.value })}
                className="input pl-10 w-full"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Last Name
            </label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={e => updateFields({ lastName: e.target.value })}
                className="input pl-10 w-full"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}