import { getJobDetails } from '@/modules/fetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Dashboard';
import JobDetail from '@/components/seeker/job/JobDetail';

const JobDetails = () => {
  const router = useRouter();
  const { jobId } = router.query;

  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getJobDetails(jobId);
      setJob(res);
    };
    if (jobId) {
      fetchData();
    }
  }, [jobId]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <JobDetail job={job} />
    </Layout>
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
      role,
    },
  };
};
