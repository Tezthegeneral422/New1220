import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { mockJobs } from '../data/mockJobs';
import { JobDescription } from '../components/jobs/JobDescription';
import { SkillsList } from '../components/jobs/SkillsList';
import { ApplicationModal } from '../components/jobs/ApplicationModal';
import { CourseRecommendationModal } from '../components/courses/CourseRecommendationModal';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { getMissingSkills, getRecommendedCourses } from '../utils/courseRecommendations';
import { mockCourses } from '../data/mockCourses';

export function JobDetailsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { skills } = useUser();
  const [isApplicationModalOpen, setIsApplicationModalOpen] = React.useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = React.useState(false);

  const job = mockJobs.find(j => j.id === jobId);
  const userSkills = skills.map(s => s.name);
  const allJobSkills = [...(job?.technicalSkills || []), ...(job?.softSkills || [])];
  const missingSkills = getMissingSkills(userSkills, allJobSkills);
  const recommendedCourses = getRecommendedCourses(missingSkills, mockCourses);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-background-dark py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Job not found</h2>
            <Link to="/jobs" className="text-button-primary hover:opacity-80 mt-4 inline-block">
              Return to Job Board
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setIsApplicationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/jobs"
            className="inline-flex items-center text-button-primary hover:opacity-80"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Job Board
          </Link>
        </div>

        <div className="bg-white dark:bg-background-card rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-start space-x-4 mb-6">
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {job.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">{job.company}</p>
                <div className="mt-2 space-x-4">
                  <span className="text-gray-500 dark:text-gray-300">{job.location}</span>
                  <span className="text-gray-500 dark:text-gray-300">{job.type}</span>
                  <span className="text-gray-500 dark:text-gray-300">{job.salary}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <SkillsList
                technicalSkills={job.technicalSkills}
                softSkills={job.softSkills}
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleApply}
                className="btn-primary"
              >
                Apply Now
              </button>
              <button
                onClick={() => setIsCourseModalOpen(true)}
                className="bg-[#3A3B3C] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
              >
                Upskill for Role
              </button>
            </div>
          </div>

          <div className="border-t dark:border-gray-700">
            <div className="p-6">
              <JobDescription
                description="Join our dynamic team as we build the next generation of web applications..."
                requirements={[
                  'Strong experience with modern JavaScript and TypeScript',
                  'Experience with React and modern frontend frameworks',
                  'Understanding of web performance optimization',
                  'Excellent problem-solving skills'
                ]}
                responsibilities={[
                  'Develop and maintain high-quality web applications',
                  'Collaborate with cross-functional teams',
                  'Participate in code reviews',
                  'Mentor junior developers'
                ]}
                benefits={[
                  'Competitive salary and equity package',
                  'Flexible remote work options',
                  'Health insurance coverage',
                  'Professional development budget'
                ]}
              />
            </div>
          </div>
        </div>

        <ApplicationModal
          job={job}
          isOpen={isApplicationModalOpen}
          onClose={() => setIsApplicationModalOpen(false)}
        />

        <CourseRecommendationModal
          isOpen={isCourseModalOpen}
          onClose={() => setIsCourseModalOpen(false)}
          jobTitle={job.title}
          courses={recommendedCourses}
          missingSkills={missingSkills}
        />
      </div>
    </div>
  );
}