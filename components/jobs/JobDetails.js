import React from 'react';

const DetailJob = ({ job }) => {
  const startingDate = new Date(job.starting_date);
  const formattedStartingDate = startingDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
      <div className='max-w-2xl mx-auto mb-5 my-10 px-10'>
        <div className='bg-gray-100 py-10 shadow-md rounded-lg p-6'>
          <div className='relative'>
            <h1 className='text-4xl font-bold text-left mt-8 mb-4 relative z-10'>
              {job.title}
            </h1>
          </div>
          <p className='text-gray-700 mb-2 opacity-70'>{job.location}</p>
          <p className='text-gray-800 mb-4 text-lg font-medium'>
            {job.description}
          </p>
          <div className='max-w-2xl mx-auto mb-2'>
            <div className='w-full sm:w-1/2'>
              <p className='text-gray-700 mb-2 font-semibold'>Requirement:</p>
              <p className='text-gray-700 mb-2'>{job.requirement}</p>
              <p className='text-gray-700 mb-2 my-5 font-semibold'>
                Job Level: {job.job_level}
              </p>
              <p className='text-gray-700 mb-2 my-5'>{job.type}</p>
            </div>
            <div className='w-full flex justify-between items-center mx-auto'>
              <span className='px-2 py-1 text-sm font-medium text-white bg-green-600 border rounded-md mb-2'>
                Rp.{job.minimum_salary} - Rp.{job.maximum_salary}
              </span>
              <p className='text-gray-700 mb-5'>
                Starting: {formattedStartingDate}
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default DetailJob;
