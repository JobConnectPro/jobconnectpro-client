import BasicInfomationApplicant from './applicant/basicInformation';
import WorkExperienceApplicant from './applicant/workExperience';
import EducationApplicant from './applicant/Education';
import OrganizationApplicant from './applicant/Organization';
import ProjectApplicant from './applicant/Project';
import SkillApplicant from './applicant/Skill';
import ApplicantStatus from './applicant/ApplicantStatus';
import AchievementApplicant from './applicant/Achievement';
import TrainingApplicant from './applicant/Training';

const ApplicantProfile = () => {
  return (
    <div className="grid grid-cols-1 mx-6 mt-7 gap-2">
      <ApplicantStatus />
      <BasicInfomationApplicant />
      <WorkExperienceApplicant />
      <EducationApplicant />
      <OrganizationApplicant />
      <AchievementApplicant />
      <ProjectApplicant />
      <TrainingApplicant />
      <SkillApplicant />
    </div>
  );
};

export default ApplicantProfile;
