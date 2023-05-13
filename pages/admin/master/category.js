import CategoryForm from '@/components/admin/CategoryForm';
import Layout from '@/components/layout/Dashboard';

const Categories = () => {
  return (
    <Layout>
      <CategoryForm />
    </Layout>
  );
};

export default Categories;

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
