import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const JobCard = ({ job }) => {
  const diffForHumans = (date) => {
    const now = new Date();
    const newDate = new Date(date);
    const diffInMs = Math.abs(now - newDate);
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'today';
    } else if (diffInDays === 1) {
      return 'yesterday';
    } else {
      return `${diffInDays} days ago`;
    }
  };

  return (
    <>
      {job.status === '1' && (
        <div className="bg-white rounded-lg border-slate-200 border p-6 flex items-center justify-between">
          <div className="flex items-center">
            {job.Company.logo != null && <Image loader={() => job.Company.logo} className="mr-4 object-cover object-center" src={job.Company.logo} alt="Alternative text" width={60} height={60} />}
            {job.Company.logo == null && <Image className="mr-4 object-cover object-center" src="/img/blank-pp.jpg" alt="Alternative text" width={60} height={60} />}
            <div>
              <Link href={`/seeker/job/${job.id}`}>
                <h2 className="text-lg font-semibold text-black hover:text-blue-900">{job.title}</h2>
              </Link>
              <Link href={`/seeker/companies/${job.Company.id}`}>
                <p className="text-blue-500 hover:text-blue-900">{job.Company.company_name}</p>
              </Link>
              <p className="text-gray-500 text-sm mb-3">
                {job.location} &#x2022; {job.type}
              </p>
              <p className="text-gray-500 text-xs">Posted {diffForHumans(job.createdAt)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobCard;
