import React from 'react';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileSettings } from '../components/profile/ProfileSettings';
import { useProfile } from '../hooks/auth/useProfile';
import { LoadingScreen } from '../components/common/LoadingScreen';

export function ProfilePage() {
  const { profile, isLoading, update } = useProfile();

  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleUpdateProfilePicture = async (url: string) => {
    try {
      await update({ avatar_url: url });
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileHeader 
          profile={profile} 
          onUpdateProfilePicture={handleUpdateProfilePicture}
        />
        <div className="mt-8">
          <ProfileSettings profile={profile} />
        </div>
      </div>
    </div>
  );
}