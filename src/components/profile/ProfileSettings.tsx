import React from 'react';
import { ProfileForm } from './ProfileForm';
import { SecuritySettings } from './SecuritySettings';
import { PreferencesForm } from './PreferencesForm';
import { SubscriptionSettings } from './SubscriptionSettings';
import type { Database } from '../../types/database';

interface ProfileSettingsProps {
  profile: Database['public']['Tables']['user_profiles']['Row'] | null;
}

export function ProfileSettings({ profile }: ProfileSettingsProps) {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-background-card rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Profile Information
          </h2>
          <ProfileForm profile={profile} />
        </div>
      </div>

      <div className="bg-white dark:bg-background-card rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Subscription
          </h2>
          <SubscriptionSettings />
        </div>
      </div>

      <div className="bg-white dark:bg-background-card rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Security Settings
          </h2>
          <SecuritySettings />
        </div>
      </div>

      <div className="bg-white dark:bg-background-card rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Preferences
          </h2>
          <PreferencesForm profile={profile} />
        </div>
      </div>
    </div>
  );
}