import Layout from '@/components/layout/Dashboard';
import SectorsForm from '@/components/admin/SectorsForm';

const Sectors = () => {
  return (
    <Layout>
      <SectorsForm />
    </Layout>
  );
};

export default Sectors;

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
