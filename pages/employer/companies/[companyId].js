import { getCompanyDetail } from '@/modules/fetchCompanies';
import CompanyDetailEmployer from '@/components/employer/company/CompanyDetailEmployer';
import Layout from '@/components/layout/Dashboard';

const CompanyDetails = ({ data }) => {
  return (
    <Layout>
      <CompanyDetailEmployer res={data} />
    </Layout>
  );
};

export default CompanyDetails;

export const getServerSideProps = async (context) => {
  const { companyId } = context.query;
  const { role, token } = context.req.cookies;

  const data = await getCompanyDetail(companyId, context);

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
      data,
    },
  };
};
