import React from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

export function UpgradePrompt() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white dark:bg-background-card rounded-lg shadow-lg p-8">
          <div className="mx-auto w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-button-primary" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Premium Feature
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This feature is available exclusively to our premium subscribers. Upgrade your plan to unlock:
          </p>
          
          <ul className="text-left text-sm text-gray-600 dark:text-gray-400 mb-6 space-y-2">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-button-primary rounded-full mr-2" />
              Full access to job board and applications
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-button-primary rounded-full mr-2" />
              Advanced dashboard features
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-button-primary rounded-full mr-2" />
              Personalized career insights
            </li>
          </ul>

          <Link 
            to="/subscription" 
            className="btn-primary block w-full text-center"
          >
            Upgrade Now
          </Link>
          
          <Link 
            to="/" 
            className="mt-4 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 inline-block"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}