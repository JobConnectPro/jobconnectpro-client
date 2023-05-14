import ApplicantProfile from '@/components/profile/applicant';
import Layout from '@/components/layout/Dashboard';

const ApplicantDetails = () => {
  return (
    <>
      <Layout>
        <ApplicantProfile />
      </Layout>
    </>
  );
};

export default ApplicantDetails;

export const getServerSideProps = async (context) => {
  const { role, token } = context.req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  if (role !== 'Employer') {
    if (role === 'Admin') {
      return {
        redirect: {
          destination: '/admin/profile',
          permanent: false,
        },
      };
    } else if (role === 'Seeker') {
      return {
        redirect: {
          destination: '/seeker/profile',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      role,
    },
  };
};
