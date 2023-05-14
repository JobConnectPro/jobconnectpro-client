import AttainmentForm from '@/components/admin/AttainmentForm';
import Layout from '@/components/layout/Dashboard';

const Attainments = () => {
  return (
    <Layout>
      <AttainmentForm />
    </Layout>
  );
};

export default Attainments;

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

  if (role !== 'Admin') {
    if (role === 'Employer') {
      return {
        redirect: {
          destination: '/employer/profile',
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
