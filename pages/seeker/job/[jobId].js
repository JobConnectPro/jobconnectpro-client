import { getJobDetails } from '@/modules/fetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Dashboard';
import JobDetail from '@/components/seeker/job/JobDetail';

const JobDet = () => {
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

export default JobDet;
