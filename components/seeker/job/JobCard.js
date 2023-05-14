import React from 'react';
import Link from 'next/link';

const JobCard = ({ job }) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-md flex">
      <img
        src="./rakamin.png" // sementara
        alt="Logo Company"
        className="h-12 w-12 object-contain mr-4"
      />
      <div className="flex flex-col justify-center">
        <Link href={`/seeker/job/${job.id}`}>
          <h2 className="text-lg font-bold mb-1 hover:underline hover:text-blue-700 text-blue-500">{job.title}</h2>
        </Link>
        <p className="text-gray-500 mb-2">{job.location}</p>
        <p className="text-gray-600 mb-4">{job.description}</p>
        <div className="flex space-x-2">
          <span className="px-2 py-1 text-sm font-medium text-white bg-gray-400 rounded-md">{job.type}</span>
          <span className="px-2 py-1 text-sm font-medium text-gray-500 border rounded-md">Minimum Experience: {job.minimum_experience} tahun</span>
          {job.minimum_salary && (
            <span className="px-2 py-1 text-sm font-medium text-white bg-green-600 border rounded-md">
              Rp.{job.minimum_salary} - Rp.{job.maximum_salary}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
