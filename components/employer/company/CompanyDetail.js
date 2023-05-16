import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CompanyDetail = ({ res }) => {
  const company = res;
  const jobs = company.Jobs;
  const sector = company.Sector;
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredJobs = jobs.filter((job) => {
    return job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.location.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="mt-[22px] pb-9">
      <div className="mx-6">
        <div className="rounded-lg overflow-hidden border border-slate-200">
          <div className="bg-blue-700 p-4">
            <p className="text-lg text-white ml-3">PROFILE</p>
          </div>
          <div className="grid grid-cols-1 justify-items-center md:justify-items-start lg:grid-cols-4 gap-5 bg-white px-8 py-8">
            <div className="col-span-1 lg:col-span-3 order-last lg:order-first flex flex-col">
              <div>
                <p className="text-3xl font-bold">{company.company_name}</p>
                <p className="text-gray-600 text-sm mb-4">Registered {diffForHumans(company.createdAt)}</p>
                <p className="text-gray-800 mb-5">{company.description}</p>
              </div>
              <div className="flex flex-row flex-wrap justify-start">
                <div className="basis-auto mr-4 mb-4">
                  <p className="text-gray-600 uppercase">Office Address</p>
                  <p className="text-blue-700">{company.address}</p>
                </div>
                <div className="basis-auto mr-4 mb-4">
                  <p className="text-gray-600 uppercase">Sector</p>
                  <p className="text-blue-700">{sector.sector}</p>
                </div>
                <div className="basis-auto mr-4 mb-4">
                  <p className="text-gray-600 uppercase">Website</p>
                  <p className="text-blue-700">{company.website}</p>
                </div>
                <div className="basis-auto mr-4 mb-4">
                  <p className="text-gray-600 uppercase">PIC</p>
                  <p className="text-blue-700">{company.User.name}</p>
                </div>
              </div>
            </div>
            <div className="col-span-1 lg:col-span-1 self-center border rounded-lg p-4">
              {company.logo != null && <Image loader={() => company.logo} className="object-center" src={company.logo} alt="Company Logo" width={180} height={180} />}
              {company.logo == null && <Image className="object-center" src="/img/blank-pp.jpg" alt="Company Logo" width={180} height={180} />}
            </div>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden border border-slate-200 mt-3">
          <div className="bg-blue-700 p-4 flex justify-between items-center">
            <p className="text-lg text-white ml-3">JOB OPENING IN COMPANY</p>
            <input className="w-72 rounded-md py-2 pl-2" type="text" placeholder="Find job in ompany..." onChange={handleSearch}></input>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 bg-white px-8 py-8">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <>
                  <div key={job.id} className="bg-white rounded-lg border-slate-200 border p-6 flex items-center justify-between">
                    <div className="flex items-center">
                      {company.logo != null && <Image loader={() => company.logo} className="mr-4 object-cover object-center" src={company.logo} alt="Alternative text" width={60} height={60} />}
                      {company.logo == null && <Image className="mr-4 object-cover object-center" src="/img/blank-pp.jpg" alt="Alternative text" width={60} height={60} />}
                      <div>
                        <Link href={`/seeker/job/${job.id}`}>
                          <h2 className="text-lg font-semibold text-black hover:text-blue-900">{job.title}</h2>
                        </Link>
                        <p className="text-blue-500 hover:text-blue-900">{company.company_name}</p>

                        <p className="text-gray-500 text-sm mb-3">
                          {job.location} &#x2022; {job.type}
                        </p>
                        <p className="text-gray-500 text-xs">Posted {diffForHumans(job.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <p>No job found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
