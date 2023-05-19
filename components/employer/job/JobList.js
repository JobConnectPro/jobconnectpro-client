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
    <>
      <div className="mt-[22px] h-screen">
        <div className="grid grid-cols-2">
          <h1 className="mx-6 mb-4 text-3xl font-bold">My Job</h1>
          <Link href="/employer/job/create" className="justify-self-end">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mx-6">Add Job</button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-6">
          {jobs.Jobs?.map((job) => (
            <JobCard job={job} key={job.id} />
          ))}
        </div>
      </div>
    </>
  );
};
export default JobList;
