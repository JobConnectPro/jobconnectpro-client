import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import BasicInformation from "@/components/profile/basicInfomation/BasicInformation";
import Education from "@/components/profile/Education";
import Resume from "@/components/profile/Resume";
import SalaryExpectation from "@/components/profile/salaryExpectation/SalaryExpectation";
import Skills from "@/components/profile/Skills";
import WorkExperience from '@/components/profile/workExperience/WorkExperience';

export default function profile() {
  return (
    <>
      <div>
        <Navbar />
        <Sidebar />
        <BasicInformation />
        <SalaryExpectation />
        <WorkExperience />
        <Education />
        <Skills />
        <Resume />
      </div>
    </>
  );
}
