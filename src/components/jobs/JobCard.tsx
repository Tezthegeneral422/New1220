import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { JobCardHeader } from './card/JobCardHeader';
import { JobCardDetails } from './card/JobCardDetails';
import { JobCardActions } from './card/JobCardActions';
import { SkillsList } from './SkillsList';
import { CourseRecommendationModal } from '../courses/CourseRecommendationModal';
import { ApplicationModal } from './ApplicationModal';
import { mockCourses } from '../../data/mockCourses';
import { getMissingSkills, getRecommendedCourses } from '../../utils/courseRecommendations';
import type { Job } from '../../types/job';

interface JobCardProps extends Job {
  matchPercentage: number;
  userSkills: string[];
  isAccessible?: boolean;
}

export function JobCard({ 
  id,
  title, 
  company, 
  location, 
  type, 
  salary, 
  postedAt, 
  logo, 
  technicalSkills, 
  softSkills,
  matchPercentage,
  userSkills,
  isAccessible = true,
  ...job
}: JobCardProps) {
  const [isCourseModalOpen, setIsCourseModalOpen] = React.useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = React.useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const allJobSkills = [...technicalSkills, ...softSkills];
  const missingSkills = getMissingSkills(userSkills, allJobSkills);
  const recommendedCourses = getRecommendedCourses(missingSkills, mockCourses);

  const handleCardClick = () => {
    if (!isAccessible) {
      toast.error('Upgrade to a paid plan to view more job listings');
      return;
    }
    navigate(`/jobs/${id}`);
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAccessible) {
      toast.error('Upgrade to a paid plan to apply for this job');
      return;
    }
    if (!isAuthenticated) {
      toast.error('Please sign in to apply for jobs');
      navigate('/login');
      return;
    }
    setIsApplicationModalOpen(true);
  };

  const handleUpskillClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAccessible) {
      toast.error('Upgrade to a paid plan to access upskilling recommendations');
      return;
    }
    setIsCourseModalOpen(true);
  };

  return (
    <>
      <div 
        className={`card cursor-pointer hover:shadow-lg transition-shadow relative ${
          !isAccessible ? 'opacity-50' : ''
        }`}
        onClick={handleCardClick}
      >
        <div className="p-6">
          <div className="flex flex-col h-full space-y-4">
            <JobCardHeader
              title={title}
              company={company}
              logo={logo}
              matchPercentage={matchPercentage}
            />
            
            <JobCardDetails
              location={location}
              type={type}
              salary={salary}
              postedAt={postedAt}
            />

            <SkillsList
              technicalSkills={technicalSkills}
              softSkills={softSkills}
            />

            <JobCardActions
              onApply={handleApplyClick}
              onUpskill={handleUpskillClick}
            />
          </div>
        </div>

        {!isAccessible && (
          <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-black bg-opacity-75 text-white px-4 py-2 rounded-full flex items-center">
              <Lock className="h-4 w-4 mr-2" />
              <span className="text-sm">Upgrade to Access</span>
            </div>
          </div>
        )}
      </div>

      {isAccessible && (
        <>
          <CourseRecommendationModal
            isOpen={isCourseModalOpen}
            onClose={() => setIsCourseModalOpen(false)}
            jobTitle={title}
            courses={recommendedCourses}
            missingSkills={missingSkills}
          />

          <ApplicationModal
            job={{ id, title, company, location, type, salary, postedAt, logo, technicalSkills, softSkills, ...job }}
            isOpen={isApplicationModalOpen}
            onClose={() => setIsApplicationModalOpen(false)}
          />
        </>
      )}
    </>
  );
}