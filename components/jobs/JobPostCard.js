import React from 'react';
import Link from 'next/link';
const JobPostCard = ({ job }) => {
  console.log(job);
  return (
    <div className="p-4 border rounded-lg shadow-md my-5">
      <h2 className="text-lg font-bold">{job.title}</h2>
      <p className="text-gray-500">{job.location}</p>
      <div className="mt-4 flex justify-between">
        <p className="mt-2 text-gray-600">{job.description}</p>
      </div>
      <div className="flex justify-between my-4">
        <div className=" flex items-center justify-center">
          <span className="px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded-2xl ">
            {job.type}
          </span>
          <span className="px-2 py-1 text-sm font-medium text-gray-500 border rounded-md">
            Minimum Experience :{job.minimum_experience} tahun
          </span>
          {job.minimum_salary && (
            <span className="px-2 py-1 text-sm font-medium text-white bg-green-600 border rounded-md">
              Rp.{job.minimum_salary} - Rp.{job.maximum_salary}
            </span>
          )}
        </div>
        <div className="flex  ">
          <Link href={`/employer/job/${job.id}`}>
            <button className=" py-2 px-4  rounded-md  bg-blue-500 text-white">
              Detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobPostCard;
