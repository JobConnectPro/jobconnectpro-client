import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getJobDetails } from '@/modules/fetch';
import Header from '@/components/Header';
import Footer from '@/components/homepage/Footer';
import DetailJob from '@/components/jobs/JobDetails';
import Layout from '@/components/layout/Dashboard';

const JobDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getJobDetails(id);
      console.log(res);
      setJob(res);
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  console.log(job);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <DetailJob job={job} />
      <Footer />
    </>
  );
};

export default JobDetail;
