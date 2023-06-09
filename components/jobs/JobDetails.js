import React, { useEffect } from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import EditForm from './EditJob';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const DetailJob = ({ job }) => {
  const router = useRouter()
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const handleEditClick = () => {
    setIsEditFormOpen(true);
  };
  const [role, setRole] = useState('');
  useEffect(() => {
    setRole(Cookies.get('role'));
  }, [role]);
  const startingDate = new Date(job.starting_date);
  const formattedStartingDate = startingDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`http://localhost:8000/jobs/${job.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(`${data.message}`, {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        router.push('/jobs');
        console.log(data);
      } else {
        toast.error(`${data.message}`, {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      console.log(`Error while deleting job: ${error}`);
      toast.error(`${error.message}`, {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

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

        {role === 'Employer' && (
          <div className='flex justify-end'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      {isEditFormOpen && <EditForm job={job} />}
    </div>
  );
};

export default DetailJob;
