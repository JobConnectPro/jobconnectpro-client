import { useState } from 'react';
import Link from 'next/link';

const CompanyDetail = ({ res }) => {
  const company = res;
  const jobs = company.Jobs;
  const sector = company.Sector;
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredJobs = jobs.filter((job) => {
    return job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.location.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="max-w-screen-lg p-8 pt-10 mx-auto">
      <div className="rounded-sm overflow-hidden">
        <div className="bg-blue-500 p-4">
          <p className="text-lg text-white">Profile</p>
        </div>
        <div className="flex flex-row bg-white justify-between">
          <div className="flex lg:w-3/4 px-4 py-4 mx-5">
            <div>
              <div className="mb-4">
                <p className="text-2xl font-semibold">{company.company_name}</p>
              </div>
              <div className="mb-2 ml-4">
                <p>Office Address</p>
                <p>{company.address}</p>
              </div>
              <div className="mb-2 ml-4">
                <p>Sector</p>
                <p>{sector.sector}</p>
              </div>
              <div className="ml-4">
                <p>Website</p>
                <p>{company.website}</p>
              </div>
            </div>
          </div>
          <div className="lg:1/4 px-4 py-8">
            <img className="w-44 h-44 rounded-md" src={company.logo ? company.logo : 'https://talentclick.com/wp-content/uploads/2021/08/placeholder-image-300x200.png'}></img>
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-sm overflow-hidden">
        <div className="bg-blue-500 p-4">
          <p className="text-lg text-white">Description</p>
        </div>
        <div className="bg-white h-48 px-8 py-5">
          <p>{company.description}</p>
        </div>
      </div>
      <div className="mt-4 rounded-sm overflow-hidden">
        <div className="flex flex-row bg-blue-500 p-4 justify-between">
          <div>
            <p className="text-lg text-white">Job opening in Company</p>
          </div>
          <div>
            <input className="w-72 rounded-md" type="text" placeholder="Find job in Company" onChange={handleSearch}></input>
          </div>
        </div>
        <div className="overflow-x-auto bg-white px-8 py-5">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="flex mb-4">
                <img src={company.logo ? company.logo : 'https://talentclick.com/wp-content/uploads/2021/08/placeholder-image-300x200.png'} className="w-24 h-24 rounded-xl shadow-sm mr-5"></img>
                <div>
                  <div>
                    <p className="font-semibold">{job.title}</p>
                    <p className="text-gray-700">{job.location}</p>
                    <p className="text-gray-700">{job.starting_date}</p>
                  </div>
                  <div>
                    <Link className="font-semibold text-blue-500 hover:text-blue-700" href={`http://localhost:3000/jobs/${job.id}`}>
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No job found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
