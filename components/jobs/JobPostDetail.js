import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getJobsPost } from '@/modules/fetch';
import Link from 'next/link';

const JobPostDetail = () => {
  const router = useRouter();
  const jobId = router.query.id;
  const [job, setJob] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(true);
    const fetchData = async () => {
      const res = await getJobsPost(jobId);
      setJob(res);
      setDisplay(false);
    };
    fetchData();
  }, [jobId]);
  console.log(job);
  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="p-4 border rounded-lg shadow-md my-5 bg-white">
        <h2 className="text-3xl font-bold">{job.title}</h2>
        <p className="text-gray-500">{job.Company?.company_name}</p>
        <div className="mt-4 flex-col justify-between">
          <p className="mt-2 text-gray-600">Description</p>
          <p className="mt-2 text-gray-600">{job.description}</p>
        </div>
        <div className="mt-4 flex flex-col justify-between">
          <p className="mt-2 text-gray-600">Minimum Requirement</p>
          <p className="mt-2 text-gray-600">{job.requirement}</p>
        </div>
        <div className="flex justify-between my-4">
          <div className=" flex items-center justify-center">
            <span className="px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded-2xl mr-2 ">
              {job.type}
            </span>
            <span className="px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded-2xl mr-2 ">
              {job.location}
            </span>
            <span className="px-2 py-1 text-sm font-medium text-gray-500 border rounded-md">
              Minimum Experience :{job.minimum_experience} tahun
            </span>
            <span className="px-2 py-1 text-sm font-medium text-white bg-green-600 border rounded-md">
              Rp.{job.minimum_salary} - Rp.{job.maximum_salary}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center lg:justify-start">
        {display && (
          <>
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
              <span className="sr-only">Loading...</span>
            </div>
          </>
        )}

        {job !== null &&
          job.JobApplication?.map((applicant) => (
            <Link
              href={`/list-job/`}
              className="flex flex-col p-6 mr-2 my-5  overflow-hidden bg-white shadow-lg w-60 h-52 rounded-xl dark:bg-gray-800 md:w-80"
            >
              <p className="text-lg font-bold dark:text-white py-1">
                {applicant.name}
              </p>
              <p className=" text-base font-normal py-1 ">{applicant.email}</p>
              <div className="flex justify-between items-center py-2">
                <p className=" text-base font-normal  py-1">
                  Rp.{applicant.salary_expectation}
                </p>
                <Link
                  href={`/employer/job/${job.id}/applicant/${applicant.id}`}
                >
                  <button className=" py-1 px-2  rounded-md  bg-blue-500 text-white">
                    Detail
                  </button>
                </Link>
              </div>
              <p className=" text-base font-normal text-gray-400 py-1 ">
                {applicant.Application?.status}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default JobPostDetail;
