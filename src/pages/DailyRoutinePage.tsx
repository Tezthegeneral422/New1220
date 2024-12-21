import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useDailyRoutine } from '../hooks/routines/useDailyRoutine';
import { GreetingSummary } from '../components/dashboard/routines/sections/GreetingSummary';
import { PriorityTasks } from '../components/dashboard/routines/sections/PriorityTasks';
import { ProgressTracker } from '../components/dashboard/routines/sections/ProgressTracker';
import { SkillChallenge } from '../components/dashboard/routines/sections/SkillChallenge';
import { TimeBlocks } from '../components/dashboard/routines/sections/TimeBlocks';
import { MotivationalInsight } from '../components/dashboard/routines/sections/MotivationalInsight';
import { EveningReflection } from '../components/dashboard/routines/sections/EveningReflection';

export function DailyRoutinePage() {
  const { 
    routineData, 
    completeTask, 
    updateTimeBlock,
    completeChallenge,
    submitReflection 
  } = useDailyRoutine();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-button-primary hover:opacity-80"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <GreetingSummary focusSkill={routineData.skillProgress.skill} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProgressTracker progress={routineData.skillProgress} />
              <SkillChallenge 
                challenge={routineData.dailyChallenge}
                onComplete={completeChallenge}
              />
            </div>

            <TimeBlocks 
              schedule={routineData.timeBlocks}
              onUpdateBlock={updateTimeBlock}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <PriorityTasks 
              tasks={routineData.priorityTasks}
              onComplete={completeTask}
            />
            
            <MotivationalInsight 
              quote={routineData.dailyQuote}
              tip={routineData.coachTip}
            />

            <EveningReflection 
              completed={routineData.eveningReflection.completed}
              onSubmit={submitReflection}
            />
          </div>
        </div>
      </div>
    </div>
  );
}