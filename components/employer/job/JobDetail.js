import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getJobsPost } from '@/modules/fetch';
import Link from 'next/link';
import JobEdit from './JobEdit';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Modal from 'react-modal';
import Loading from '@/components/loading/Loading';

Modal.setAppElement('#__next');

const JobDetail = () => {
  const router = useRouter();
  const jobId = router.query.id;
  const [job, setJob] = useState([]);
  const [display, setDisplay] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const startingDate = new Date(job.starting_date);
  const formattedStartingDate = startingDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleEditClick = () => {
    setIsEditFormOpen(true);
  };

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
    setDisplay(true);
    const fetchData = async () => {
      const res = await getJobsPost(jobId);
      setJob(res);
      setDisplay(false);
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
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
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        router.push('/employer/job');
        setIsModalOpen(false);
      } else {
        setIsModalOpen(false);
        toast.error(`${data.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log(`Error while deleting job: ${error}`);
      setIsModalOpen(false);
      toast.error(`${error.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-[22px] pb-9">
      {!isEditFormOpen && (
        <>
          <h1 className="mx-6 mb-3 text-3xl font-bold">
            My Job Detail &{' '}
            <span className="text-blue-700 hover:text-blue-500 cursor-pointer">
              <a href="#applicant"> Applicant</a>
            </span>
          </h1>
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden mx-6">
            <div className="flex items-center justify-center pt-10">
              {job.Company?.logo != null && <Image loader={() => job.Company?.logo} className="object-center" src={job.Company?.logo} alt="Profile Picture" width={150} height={150} />}
              {job.Company?.logo == null && <Image className="object-center" src="/img/blank-pp.jpg" alt="Profile Picture" width={150} height={150} />}
            </div>
            <div className="px-6 pt-4 pb-3 border-b">
              <h1 className="text-4xl font-bold text-left mt-8 relative z-10">{job.title}</h1>
              <Link href={`/employer/companies/${job.Company?.id}`}>
                <p className="text-blue-700 text-lg hover:text-blue-900">{job.Company?.company_name}</p>
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
                  <h1 className="text-lg text-gray-500">COMPANY</h1>
                  <p className="text-blue-700">{job.Company?.company_name}</p>
                </div>
                <div className="col-span-2">
                  <h1 className="text-lg text-gray-500">SALARY</h1>
                  {job.minimum_salary !== 0 && (
                    <p className="text-blue-700">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(job.minimum_salary)} -{' '}
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(job.maximum_salary)}
                    </p>
                  )}
                  {job.minimum_salary === 0 && <p className="text-red-700">Private</p>}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 text-end">
              <button onClick={handleEditClick} className="bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded mr-2">
                Edit Job
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Modal Confirmation */}
          <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal" overlayClassName="modal-overlay">
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-10" />
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-lg transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="flex flex-col items-center">
                        <div className="mx-auto flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-red-100 ">
                          <svg className="h-14 w-14 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                            />
                          </svg>
                        </div>
                        <div className="mt-3 text-center">
                          <h3 className="text-2xl mb-1 font-semibold leading-6 text-gray-900" id="modal-title">
                            Are you sure?
                          </h3>
                          <div className="self-center">
                            <p className="text-sm text-gray-500">This data will be removed. This action cannot be undone.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={handleDeleteClick}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
      {!isEditFormOpen && (
        <>
          <div className="rounded-lg overflow-hidden border border-slate-200 mt-3 mx-6" id="applicant">
            <div className="bg-blue-700 p-4 flex justify-between items-center">
              <p className="text-lg text-white ml-3">APPLICANT</p>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 bg-white px-8 py-8">
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
                    <div className="bg-white hover:bg-gray-300 rounded-lg border-gray-300 border p-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <div>
                          <h2 className="text-blue-700 text-lg">{applicant.name}</h2>
                          <p className="mb-3 text-gray-600">{applicant.email}</p>
                          <p className="text-sm text-black">
                            Salary Expectation: {applicant.privacy === 'Public' && new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(applicant.salary_expectation)}
                            {applicant.privacy !== 'Public' && <span className="text-red-500">Private</span>}
                          </p>
                          <p className="text-sm mb-3 text-black">
                            Applied On:{' '}
                            {new Date(applicant.Application?.createdAt).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                          <p className="text-green-500">{applicant.Application?.status}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </>
      )}
      {isEditFormOpen && <JobEdit job={job} />}
    </div>
  );
};

export default JobDetail;
