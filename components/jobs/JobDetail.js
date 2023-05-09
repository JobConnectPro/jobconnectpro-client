import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getJobDetails } from '@/modules/fetch';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getJobDetails(id);
      setJob(res.data);
    };
    fetchData();
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className='max-w-2xl mx-auto mb-5'>
      <h1 className='text-3xl font-bold text-center mt-8 mb-4'>{job.title}</h1>
      <div className='bg-white shadow p-4 rounded'>
        <p className='text-gray-700 mb-4'>{job.description}</p>
        <p className='text-gray-700 mb-4'>
          Requirement: {job.requirement}
        </p>
        <p className='text-gray-700 mb-4'>Job Level: {job.job_level}</p>
        <p className='text-gray-700 mb-4'>
          Minimum Salary: {job.minimum_salary}
        </p>
        <p className='text-gray-700 mb-4'>
          Maximum Salary: {job.maximum_salary}
        </p>
        <p className='text-gray-700 mb-4'>Type: {job.type}</p>
        <p className='text-gray-700 mb-4'>Location: {job.location}</p>
        <p className='text-gray-700 mb-4'>
          Starting Date: {job.starting_date}
        </p>
        <p className='text-gray-700 mb-4'>
          Minimum Experience: {job.minimum_experience}
        </p>
      </div>
    </div>
  );
};

export default JobDetail;
