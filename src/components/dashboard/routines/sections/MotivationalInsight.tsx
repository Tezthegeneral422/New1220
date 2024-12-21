import React from 'react';
import { Quote, Lightbulb } from 'lucide-react';

interface MotivationalInsightProps {
  quote: {
    text: string;
    author: string;
  };
  tip: string;
}

export function MotivationalInsight({ quote, tip }: MotivationalInsightProps) {
  return (
    <div className="bg-gray-50 dark:bg-background-card rounded-lg p-4 border border-gray-100 dark:border-gray-700">
      <div className="space-y-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Quote className="h-5 w-5 text-button-primary" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Daily Quote</h3>
          </div>
          <blockquote className="text-sm text-gray-600 dark:text-gray-400 italic">
            "{quote.text}"
            <footer className="mt-1 text-xs text-gray-500 dark:text-gray-500">
              — {quote.author}
            </footer>
          </blockquote>
        </div>

        <div className="border-t dark:border-gray-700 pt-4">
          <div className="flex items-center space-x-2 mb-2">
            <Lightbulb className="h-5 w-5 text-button-primary" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">AI Coach Tip</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{tip}</p>
        </div>
      </div>
    </div>
  );
}