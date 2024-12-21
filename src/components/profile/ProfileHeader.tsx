import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProfilePicture } from './ProfilePicture';
import type { Database } from '../../types/database';

type Profile = Database['public']['Tables']['user_profiles']['Row'];

interface ProfileHeaderProps {
  profile: Profile | null;
  onUpdateProfilePicture: (url: string) => void;
}

export function ProfileHeader({ profile, onUpdateProfilePicture }: ProfileHeaderProps) {
  return (
    <div>
      <div className="mb-6">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-button-primary hover:opacity-80"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        <ProfilePicture
          imageUrl={profile?.avatar_url || null}
          onUpdate={onUpdateProfilePicture}
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {profile?.first_name} {profile?.last_name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 capitalize">
            {profile?.career_level || 'Career Level Not Set'} •{' '}
            {profile?.career_focus?.join(', ') || 'Focus Not Set'}
          </p>
        </div>
      </div>
    </div>
  );
}