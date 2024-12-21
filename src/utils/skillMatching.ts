// Calculate match percentage based on user skills
export function calculateSkillMatch(
  userSkills: string[],
  jobTechnicalSkills: string[],
  jobSoftSkills: string[]
): number {
  const allJobSkills = [...jobTechnicalSkills, ...jobSoftSkills];
  const matchingSkills = userSkills.filter(skill => 
    allJobSkills.some(jobSkill => jobSkill.toLowerCase() === skill.toLowerCase())
  );
  
  return Math.round((matchingSkills.length / allJobSkills.length) * 100);
}