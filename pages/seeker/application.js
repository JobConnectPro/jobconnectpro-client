import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Dashboard';
import Image from 'next/image';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Link from 'next/link';

const Applications = ({ data }) => {
  const [profile, setProfile] = useState({ ...data });
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    if (isDelete === false) {
      axios
        .get('http://localhost:8000/users/job-application', {
          headers: { authorization: 'Bearer ' + Cookies.get('token') },
        })
        .then((res) => {
          setProfile({ ...res.data });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isDelete]);

  const handleDelete = (applicationId) => {
    axios
      .delete(`http://localhost:8000/users/job-application/${applicationId}`, {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setIsDelete(false);
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

  return (
    <Layout>
      <div className="mt-[22px] h-screen">
        <h1 className="mx-6 mb-4 text-3xl font-bold">Application</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row justify-start gap-2 mx-6">
          {profile.UserApplication.map((application) => {
            return (
              <div className="bg-white rounded-lg border-slate-200 border p-6 flex items-center justify-between" key={application.id}>
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
                    <p className="text-green-500 text-sm">{application.Application.status}</p>
                  </div>
                </div>
                {application.Application.status === 'Application being reviewed' && (
                  <button
                    onClick={() => {
                      setIsDelete(true);
                      handleDelete(application.id);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold p-2 rounded"
                  >
                    Cancel
                  </button>
                )}
              </div>
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
