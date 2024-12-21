import React from 'react';
import { Loader } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark flex items-center justify-center">
      <div className="text-center">
        <Loader className="h-8 w-8 animate-spin text-button-primary mx-auto" />
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}