import React, { useEffect } from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Loading from '@/components/loading/Loading';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

const JobDetail = ({ job }) => {
  const router = useRouter();
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
  useEffect(() => {
    setRole(Cookies.get('role'));
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, [role]);

  const startingDate = new Date(job.starting_date);
  const formattedStartingDate = startingDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleBookmark = (jobId) => {
    axios
      .post(
        'http://localhost:8000/users/job-bookmark',
        { job_id: jobId },
        {
          headers: { authorization: 'Bearer ' + Cookies.get('token') },
        }
      )
      .then((res) => {
        toast.success(res.data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
  };

  const handleApplication = (jobId) => {
    axios
      .post(
        'http://localhost:8000/users/job-application',
        { job_id: jobId },
        {
          headers: { authorization: 'Bearer ' + Cookies.get('token') },
        }
      )
      .then((res) => {
        toast.success(res.data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
  };

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="mt-[22px] pb-9">
        <h1 className="mx-6 mb-3 text-3xl font-bold">Job Detail</h1>
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden mx-6">
          <div className="flex items-center justify-center pt-10">
            {job.Company.logo != null && <Image loader={() => job.Company.logo} className="object-center" src={job.Company.logo} alt="Profile Picture" width={150} height={150} />}
            {job.Company.logo == null && <Image className="object-center" src="/img/blank-pp.jpg" alt="Profile Picture" width={150} height={150} />}
          </div>
          <div className="px-6 pt-4 pb-3 border-b">
            <h1 className="text-4xl font-bold text-left mt-8 relative z-10">{job.title}</h1>
            <Link href={`/seeker/companies/${job.Company.id}`}>
              <p className="text-blue-700 text-lg hover:text-blue-900">{job.Company.company_name}</p>
            </Link>
            <p className="text-gray-700 text-lg mb-3">
              {job.location} &#x2022; {job.type}
            </p>
            <p className="text-gray-500 text-sm mb-2">Posted {diffForHumans(job.createdAt)}</p>
          </div>
          <div className="px-6 mt-5">
            <h1 className="text-2xl font-bold">Job Description</h1>
            <p className="text-gray-800 mb-4 font-medium text-justify">{job.description}</p>
            <h1 className="text-2xl font-bold">Requirement</h1>
            <p className="text-gray-800 mb-4 font-medium text-justify">{job.requirement}</p>
          </div>
          <div className="px-6 mb-2">
            <h1 className="text-2xl mb-2 font-bold">Job Summary</h1>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div>
                <h1 className="text-lg text-gray-500">JOB LEVEL</h1>
                <p className="text-blue-700">{job.job_level}</p>
              </div>
              <div>
                <h1 className="text-lg text-gray-500">JOB TYPE</h1>
                <p className="text-blue-700">{job.type}</p>
              </div>
              <div>
                <h1 className="text-lg text-gray-500">MINIMUM EXPERIENCE</h1>
                <p className="text-blue-700">{job.minimum_experience} Year</p>
              </div>
              <div>
                <h1 className="text-lg text-gray-500">STARTING DATE</h1>
                <p className="text-blue-700">{formattedStartingDate}</p>
              </div>
              <div>
                <h1 className="text-lg text-gray-500">JOB CATEGORY</h1>
                {job.JobCategories.map((category) => {
                  return <p className="text-blue-700">{category.category}</p>;
                })}
              </div>
              <div>
                <h1 className="text-lg text-gray-500">COMPANY</h1>
                <p className="text-blue-700">{job.Company.company_name}</p>
              </div>
              <div>
                <h1 className="text-lg text-gray-500">SECTOR</h1>
                <p className="text-blue-700">{job.Company.Sector.sector}</p>
              </div>
              <div>
                <h1 className="text-lg text-gray-500">WEBSITE</h1>
                <p className="text-blue-700">{job.Company.website}</p>
              </div>
              <div>
                <h1 className="text-lg text-gray-500">ADDRESS</h1>
                <p className="text-blue-700">{job.Company.address}</p>
              </div>
              <div className="col-span-2">
                <h1 className="text-lg text-gray-500">SALARY</h1>
                <p className="text-blue-700">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(job.minimum_salary)} -{' '}
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(job.maximum_salary)}
                </p>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 text-end border-b">
            {job.status === '1' && (
              <>
                <button
                  onClick={() => {
                    handleBookmark(job.id);
                  }}
                  className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded mr-2 mb-3"
                >
                  Bookmark
                </button>
                <button
                  onClick={() => {
                    handleApplication(job.id);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                >
                  Send Application
                </button>
              </>
            )}
          </div>
          <div className="px-6 mb-6 mt-5">
            <h1 className="text-2xl font-bold">About {job.Company.company_name}</h1>
            <p className="text-gray-800 mb-4 font-medium">{job.Company.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetail;
