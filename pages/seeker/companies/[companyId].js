import { getCompanyDetail } from '@/modules/fetchCompanies';
import CompanyDetail from '@/components/employer/company/CompanyDetail';
import Layout from '@/components/layout/Dashboard';

const CompanyDetails = ({ data }) => {
  return (
    <Layout>
      <CompanyDetail res={data} />
    </Layout>
  );
};

export default CompanyDetails;

export const getServerSideProps = async (context) => {
  const { role, token } = context.req.cookies;
  const { companyId } = context.query;

  const data = await getCompanyDetail(companyId, context);

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  if (role !== 'Seeker') {
    if (role === 'Admin') {
      return {
        redirect: {
          destination: '/admin/profile',
          permanent: false,
        },
      };
    } else if (role === 'Employer') {
      return {
        redirect: {
          destination: '/employer/profile',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      data,
    },
  };
};
