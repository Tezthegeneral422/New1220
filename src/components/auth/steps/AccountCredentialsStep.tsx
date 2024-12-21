import React from 'react';
import { Mail, Lock, User } from 'lucide-react';
import type { OnboardingData } from '../../../types/onboarding';

type AccountCredentialsProps = Pick<OnboardingData, 'email' | 'password' | 'firstName' | 'lastName'> & {
  updateFields: (fields: Partial<OnboardingData>) => void;
};

export function AccountCredentialsStep({ 
  email, 
  password, 
  firstName,
  lastName,
  updateFields 
}: AccountCredentialsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Create your account
        </h3>
        
        <div className="space-y-4">
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

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => updateFields({ email: e.target.value })}
                className="input pl-10 w-full"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => updateFields({ password: e.target.value })}
                className="input pl-10 w-full"
                required
                minLength={8}
              />
              <p className="mt-1 text-sm text-gray-500">Must be at least 8 characters</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}