import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Briefcase, MapPin, Building, ArrowRight } from 'lucide-react';
import { mockJobs } from '../../../data/mockJobs';
import { calculateSkillMatch } from '../../../utils/skillMatching';
import { useUser } from '../../../context/UserContext';
import { MatchIndicator } from '../../jobs/MatchIndicator';

export function JobMatches() {
  const navigate = useNavigate();
  const { skills } = useUser();
  const userSkills = skills.map(s => s.name);

  // Get top 3 matched jobs
  const matchedJobs = mockJobs
    .map(job => ({
      ...job,
      matchPercentage: calculateSkillMatch(
        userSkills,
        job.technicalSkills,
        job.softSkills
      )
    }))
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, 3);

  return (
    <div className="p-6 border border-white dark:border-gray-700 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Briefcase className="h-4 w-4 text-button-primary" />
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">Matched Jobs</h2>
        </div>
        <Link
          to="/jobs"
          className="text-button-primary hover:opacity-80 text-sm font-medium flex items-center"
        >
          View All Jobs
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="space-y-4">
        {matchedJobs.map((job) => (
          <div
            key={job.id}
            onClick={() => navigate(`/jobs/${job.id}`)}
            className="bg-gray-50 dark:bg-background-card rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-start space-x-3">
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-grow min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {job.title}
                    </h3>
                    <div className="mt-1 space-y-1">
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Building className="h-3 w-3 mr-1" />
                        {job.company}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <MapPin className="h-3 w-3 mr-1" />
                        {job.location}
                      </div>
                    </div>
                  </div>
                  <MatchIndicator percentage={job.matchPercentage} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}