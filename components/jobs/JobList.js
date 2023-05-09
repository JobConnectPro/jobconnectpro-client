import { getJobsList } from '@/modules/fetch';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await getJobsList(searchQuery);
      setJobs(res.data);
    };
    fetchData();
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='max-w-2xl mx-auto mb-5'>
      <h1 className='text-3xl font-bold text-center mt-8 mb-4'>Jobs</h1>
      <div className='mb-4'>
        <input
          type='text'
          className='border-gray-400 border-2 py-2 px-4 w-full rounded-md'
          placeholder='Search jobs by title...'
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className='grid gap-4'>
        {jobs.map((job) => (
          <div key={job.id} className='bg-white shadow p-4 rounded'>
            <Link href={`/jobs/${job.id}`}>
              <h2 className='text-xl font-bold mb-2'>{job.title}</h2>
            </Link>
            <p className='text-gray-700 mb-4'>{job.location}</p>
            <p className='text-gray-700 mb-4'>Type :{job.type}</p>
            <p className='text-gray-700 mb-4'>
              Minimum Experience : {job.minimum_experience}
            </p>
            <p className='text-gray-700 mb-4'>{job.description}</p>
            <div className='flex justify-between text-gray-600'>
              <p className='mr-4'>
                <span className='font-bold'>Minimum Salary:</span>{' '}
                {job.minimum_salary}
              </p>
              <p>
                <span className='font-bold'>Maximum Salary:</span>{' '}
                {job.maximum_salary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
