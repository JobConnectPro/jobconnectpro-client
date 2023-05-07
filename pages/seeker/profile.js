import Layout from '@/components/layout/Dashboard';
import SalaryExpectation from '@/components/profile/salaryExpectation/SalaryExpectation';
import BasicInformation from '@/components/profile/basicInfomation/BasicInformation';
import WorkExperience from '@/components/profile/WorkExperience';
import Education from '@/components/profile/Education';
import Resume from '@/components/profile/Resume';
import Skills from '@/components/profile/Skills';
import Summary from '@/components/profile/summary/Summary';
import Achievement from '@/components/profile/achievement/Achievement';

const Profile = ({ profile }) => {
  return (
    <Layout>
      <BasicInformation userProfile={profile} />
      <SalaryExpectation userProfile={profile} />
      <Summary userProfile={profile} />
      <Achievement userProfile={profile} />
      <WorkExperience />
      <Education />
      <Skills />
      <Resume />
    </Layout>
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
