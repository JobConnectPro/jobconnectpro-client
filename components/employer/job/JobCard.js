import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const JobPostCard = ({ job }) => {
  return (
    <div className="bg-white rounded-lg border-slate-200 border p-6 flex items-center justify-between">
      <div className="flex items-center basis-4/5">
        {job.Company.logo != null && <Image loader={() => job.Company.logo} className="mr-4 object-cover object-center" src={job.Company.logo} alt="Alternative text" width={60} height={60} />}
        {job.Company.logo == null && <Image className="mr-4 object-cover object-center" src="/img/blank-pp.jpg" alt="Alternative text" width={60} height={60} />}
        <div className="">
          <Link href={`/employer/job/${job.id}`}>
            <h2 className="text-xl font-bold hover:underline hover:text-blue-700">{job.title}</h2>
          </Link>
          <p className="text-blue-500 font-bold mb-1">{job.Company.company_name}</p>
          <p className="text-gray-600">{job.location}</p>
        </div>
      </div>
      <div className="flex flex-col basis-1/5 justify-center">
        <span className="px-2 py-1 text-sm text-center mb-1 text-white bg-blue-700 rounded-md">{job.type}</span>
        <span className="px-2 py-1 text-sm text-center text-gray-500 border rounded-md">Min: {job.minimum_experience} tahun</span>
      </div>
    </div>
  );
};

export default JobPostCard;
