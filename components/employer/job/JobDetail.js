import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getJobsPost } from '@/modules/fetch';
import Link from 'next/link';
import JobEdit from './JobEdit';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Image from 'next/image';

const JobDetail = () => {
  const router = useRouter();
  const jobId = router.query.id;
  const [job, setJob] = useState([]);
  const [display, setDisplay] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const startingDate = new Date(job.starting_date);
  const formattedStartingDate = startingDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleEditClick = () => {
    setIsEditFormOpen(true);
  };

  useEffect(() => {
    setDisplay(true);
    const fetchData = async () => {
      const res = await getJobsPost(jobId);
      setJob(res);
      setDisplay(false);
    };
    fetchData();
  }, [jobId]);
  
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
        router.push('/employer/job');
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
    <div className="mt-[22px] pb-9">
      {!isEditFormOpen && (
        <>
          <h1 className="mx-6 mb-3 text-3xl font-bold">My Job Detail & Applicant</h1>
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden mx-6">
            <div className="flex items-center justify-center pt-10">
              {job.Company?.logo != null && <Image loader={() => job.Company?.logo} className="object-center" src={job.Company?.logo} alt="Profile Picture" width={150} height={150} />}
              {job.Company?.logo == null && <Image className="object-center" src="/img/blank-pp.jpg" alt="Profile Picture" width={150} height={150} />}
            </div>
            <div className="px-6 pt-4 pb-3 border-b">
              <h1 className="text-4xl font-bold text-left mt-8 relative z-10">{job.title}</h1>
              <p className="text-blue-700 text-lg">{job.Company?.company_name}</p>
              <p className="text-gray-700  text-lg">{job.location}</p>
            </div>
            <div className="px-6 mt-5">
              <h1 className="text-2xl font-bold">Job Description</h1>
              <p className="text-gray-800 mb-4 font-medium">{job.description}</p>
              <h1 className="text-2xl font-bold">Requirement</h1>
              <p className="text-gray-800 mb-4 font-medium">{job.requirement}</p>
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
                  <h1 className="text-lg text-gray-500">COMPANY</h1>
                  <p className="text-blue-700">{job.Company?.company_name}</p>
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
            <div className="px-6 py-4 text-end">
              <button onClick={handleEditClick} className="bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded mr-2">
                Edit Job
              </button>
              <button onClick={handleDeleteClick} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </div>
          </div>
        </>
      )}
      {!isEditFormOpen && (
        <>
          <h1 className="mx-6 mt-6 mb-2 text-2xl font-bold">Applicant</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 grid-flow-row justify-start gap-2 mx-6">
            {display && (
              <>
                <div role="status" className="max-w-sm animate-pulse">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
                  <span className="sr-only">Loading...</span>
                </div>
              </>
            )}
            {job !== null &&
              job.JobApplication?.map((applicant) => (
                <Link href={`/employer/job/${job.id}/applicant/${applicant.id}`} key={applicant.id}>
                  <div className="bg-gray-800 hover:bg-slate-900 rounded-lg border-slate-200 border p-6 flex items-center justify-between">
                    <div className="flex items-center">
                      <div>
                        <h2 className="text-lg font-semibold text-white">{applicant.name}</h2>
                        <p className="text-blue-500">{applicant.email}</p>
                        <p className="text-yellow-500 text-sm mb-3">
                          <span className="text-yellow-500">Salary Expectation: </span> {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(applicant.salary_expectation)}
                        </p>
                        <p className="text-green-500 text-sm">{applicant.Application?.status}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </>
      )}
      {isEditFormOpen && <JobEdit job={job} />}
    </div>
  );
};

export default JobDetail;
