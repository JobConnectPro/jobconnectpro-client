import JobDetail from '@/components/employer/job/JobDetail';
import Layout from '@/components/layout/Dashboard';

const JobDetails = () => {
  return (
    <>
      <Layout>
        <JobDetail />
      </Layout>
    </>
  );
};

export default JobDetails;

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
