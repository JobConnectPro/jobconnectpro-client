import Layout from '@/components/layout/Dashboard';
import BasicInformation from '@/components/profile/basicInfomation/BasicInformation';

const Profile = ({ profile }) => {
  return (
    <Layout>
      <BasicInformation userProfile={profile} />
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
