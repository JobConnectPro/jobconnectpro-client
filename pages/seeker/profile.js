import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import SalaryExpectation from '@/components/profile/SalaryExpectation';
import BasicInformation from '@/components/profile/BasicInformation';
import WorkExperience from '@/components/profile/WorkExperience';
import Education from '@/components/profile/Education';
import Resume from '@/components/profile/Resume';
import Skills from '@/components/profile/Skills';

const Profile = ({ profile }) => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <BasicInformation userProfile={profile} />
      <SalaryExpectation />
      <WorkExperience />
      <Education />
      <Skills />
      <Resume />
    </div>
  );
};

export default Profile;

export const getServerSideProps = async (context) => {
  const { token } = context.req.cookies;

  const result = await fetch('http://localhost:8000/users/profile', {
    headers: { Authorization: 'Bearer ' + token },
  });
  const data = await result.json();

  return {
    props: {
      profile: data,
    },
  };
};
