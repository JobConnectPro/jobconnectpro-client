import { Fragment, useEffect, useState } from 'react';
import Layout from '@/components/layout/Dashboard';
import Image from 'next/image';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Modal from 'react-modal';
import Loading from '@/components/loading/Loading';

Modal.setAppElement('#__next');

const Applications = ({ data }) => {
  const [profile, setProfile] = useState({ ...data });
  const [isDelete, setIsDelete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isDelete === false) {
      axios
        .get('http://localhost:8000/users/job-application', {
          headers: { authorization: 'Bearer ' + Cookies.get('token') },
        })
        .then((res) => {
          setProfile({ ...res.data });
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isDelete]);

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

  const handleDelete = (applicationId) => {
    axios
      .delete(`http://localhost:8000/users/job-application/${applicationId}`, {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setIsDelete(false);
        setIsModalOpen(false);
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="mt-[22px] h-screen">
        <h1 className="mx-6 mb-4 text-3xl font-bold">Application</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row justify-start gap-2 mx-6">
          {profile.UserApplication.map((application) => {
            return (
              <Fragment key={application.id}>
                <div className="bg-white rounded-lg border-slate-200 border p-6 flex items-center justify-between">
                  <div className="flex items-center">
                    {application.Company.logo != null && (
                      <Image loader={() => application.Company.logo} className="mr-4 object-cover object-center" src={application.Company.logo} alt="Alternative text" width={60} height={60} />
                    )}
                    {application.Company.logo == null && <Image className="mr-4 object-cover object-center" src="/img/blank-pp.jpg" alt="Alternative text" width={60} height={60} />}
                    <div>
                      <Link href={`/seeker/job/${application.id}`}>
                        <h2 className="text-lg font-semibold text-black hover:text-blue-900">{application.title}</h2>
                      </Link>
                      <Link href={`/seeker/companies/${application.Company.id}`}>
                        <p className="text-blue-500 hover:text-blue-900">{application.Company.company_name}</p>
                      </Link>
                      <p className="text-gray-500 text-sm mb-3">
                        {application.location} &#x2022; {application.type}
                      </p>
                      <p className="text-gray-500 text-xs mb-3">
                        {application.status === '1' ? <span className="text-green-500">Active</span> : <span className="text-red-500">Inactive</span>} &#x2022; Posted{' '}
                        {diffForHumans(application.createdAt)}
                      </p>
                      <p className="text-green-500 text-sm">{application.Application.status}</p>
                    </div>
                  </div>

                  {application.Application.status === 'Application being reviewed' && (
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setCurrentId(application.id);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2 px-6 rounded self-center md:self-end"
                    >
                      Cancel
                    </button>
                  )}
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
                              onClick={() => {
                                setIsDelete(true);
                                handleDelete(currentId);
                              }}
                            >
                              Remove
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
              </Fragment>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Applications;

export const getServerSideProps = async (context) => {
  const { role, token } = context.req.cookies;

  const result = await fetch('http://localhost:8000/users/job-application', {
    headers: { Authorization: 'Bearer ' + token },
  });
  const data = await result.json();

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  if (role !== 'Seeker') {
    if (role === 'Admin') {
      return {
        redirect: {
          destination: '/admin/profile',
          permanent: false,
        },
      };
    } else if (role === 'Employer') {
      return {
        redirect: {
          destination: '/employer/profile',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      data,
    },
  };
};
