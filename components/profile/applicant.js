import BasicInfomationApplicant from './applicant/basicInformation';
import WorkExperienceApplicant from './applicant/workExperience';
import EducationApplicant from './applicant/Education';
import OrganizationApplicant from './applicant/Organization';
import ProjectApplicant from './applicant/Project';
import SkillApplicant from './applicant/Skill';
const ApplicantProfile = () => {
  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="p-4 border rounded-lg shadow-md my-5 bg-white">
        <BasicInfomationApplicant />
        <WorkExperienceApplicant />
        <EducationApplicant />
        <OrganizationApplicant />
        <ProjectApplicant />
        <SkillApplicant />
      </div>
    </div>
  );
};

export default ApplicantProfile;
