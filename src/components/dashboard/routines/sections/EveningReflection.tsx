import React, { useState } from 'react';
import { Moon } from 'lucide-react';

interface EveningReflectionProps {
  onSubmit: (answers: string[]) => void;
  completed: boolean;
}

export function EveningReflection({ onSubmit, completed }: EveningReflectionProps) {
  const [answers, setAnswers] = useState(['', '', '']);
  const questions = [
    "What was your biggest achievement today?",
    "What did you learn?",
    "What could you improve tomorrow?"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answers);
  };

  if (completed) {
    return (
      <div className="bg-gray-50 dark:bg-background-card rounded-lg p-4 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Moon className="h-5 w-5 text-button-primary" />
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Evening Reflection</h3>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          You've completed your reflection for today. Great job!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-background-card rounded-lg p-4 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center space-x-2 mb-4">
        <Moon className="h-5 w-5 text-button-primary" />
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Evening Reflection</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {questions.map((question, index) => (
          <div key={index}>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              {question}
            </label>
            <textarea
              value={answers[index]}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[index] = e.target.value;
                setAnswers(newAnswers);
              }}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-background-card text-gray-900 dark:text-white"
              rows={2}
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full px-3 py-2 text-sm font-medium bg-button-primary text-black rounded-md hover:opacity-90 transition-opacity"
        >
          Complete Reflection
        </button>
      </form>
    </div>
  );
}