import React from 'react';
import type { OnboardingData } from '../../../types/onboarding';

type BasicInfoProps = Pick<OnboardingData, 'firstName' | 'lastName' | 'email' | 'password'> & {
  updateFields: (fields: Partial<OnboardingData>) => void;
};

export function BasicInfoStep({ firstName, lastName, email, password, updateFields }: BasicInfoProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-white">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={e => updateFields({ firstName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-button-primary focus:ring-button-primary bg-white dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-white">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={e => updateFields({ lastName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-button-primary focus:ring-button-primary bg-white dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => updateFields({ email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-button-primary focus:ring-button-primary bg-white dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => updateFields({ password: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-button-primary focus:ring-button-primary bg-white dark:bg-gray-700 dark:text-white"
          required
          minLength={8}
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Must be at least 8 characters
        </p>
      </div>
    </div>
  );
}