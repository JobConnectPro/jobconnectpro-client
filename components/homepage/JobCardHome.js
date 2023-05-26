import React from "react";
import Link from "next/link";
import Image from "next/image";

const JobCardHome = ({ job }) => {
  const diffForHumans = (date) => {
    const now = new Date();
    const newDate = new Date(date);
    const diffInMs = Math.abs(now - newDate);
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return "today";
    } else if (diffInDays === 1) {
      return "yesterday";
    } else {
      return `${diffInDays} days ago`;
    }
  };

  return (
    <>
      {job.status === "1" && (
        <div className="hover:scale-105">
          <Link href={`job-detail/${job.id}`}>
            <div className="rounded-lg border-slate-200 border p-6 shadow-gray-200 shadow-lg">
              <h2 className="text-lg h-12 font-semibold text-gray-700">{job.title}</h2>
              <div className="flex items-center">
                {job.Company.logo != null && (
                  <Image
                    loader={() => job.Company.logo}
                    className="mr-4 object-cover object-center"
                    src={job.Company.logo}
                    alt="Alternative text"
                    width={100}
                    height={100}
                  />
                )}
                {job.Company.logo == null && (
                  <Image
                    className="mr-4 object-cover object-center"
                    src="/img/blank-pp.jpg"
                    alt="Alternative text"
                    width={100}
                    height={100}
                  />
                )}
                <div>
                  <p className="text-blue-500">{job.Company.company_name}</p>
                  <p className="text-gray-500 text-sm mb-3">
                    {job.location} &#x2022; {job.type}
                  </p>
                </div>
              </div>
              <p className="w-full text-green-500 text-xs text-right">
                Posted {diffForHumans(job.createdAt)}
              </p>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default JobCardHome;
