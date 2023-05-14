import { getJobsPosts } from '@/modules/fetch';
import { useState, useEffect } from 'react';
import JobCard from './JobCard';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiEdit2Fill, RiAddCircleLine } from 'react-icons/ri';
import Link from 'next/link';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getJobsPosts();
      setJobs(res);
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mb-5">
      <h1 className="text-3xl font-bold text-center mt-8 mb-4">Jobs</h1>
      <Link href="/employer/job/create">
        <button className="bg-green-600 hover:bg-green-700 text-black font-bold p-1 rounded-md mx-10 mb-3">
          <RiAddCircleLine size={15} />
        </button>
      </Link>
      <div className="grid gap-4">
        {jobs.Jobs?.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
    </div>
  );
};
export default JobList;
