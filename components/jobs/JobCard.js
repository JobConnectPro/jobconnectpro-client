import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className='p-4 border rounded-lg shadow-md my-5'>
      <h2 className='text-lg font-bold'>{job.title}</h2>
      <p className='text-gray-500'>{job.location}</p>
      <div className='mt-4 flex justify-between'>
        <p className='mt-2 text-gray-600'>{job.description}</p>
      </div>
      <div className='flex space-x-2 my-4'>
        <span className='px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded-md'>
          {job.type}
        </span>
        <span className='px-2 py-1 text-sm font-medium text-gray-500 border rounded-md'>
          Minimum Experience :{job.minimum_experience} tahun
        </span>
        {job.minimum_salary && (
          <span className='px-2 py-1 text-sm font-medium text-white bg-green-600 border rounded-md'>
            Rp.{job.minimum_salary} - Rp.{job.maximum_salary}
          </span>
        )}
      </div>
    </div>
  );
};

export default JobCard;
