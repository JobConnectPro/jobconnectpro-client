import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Dashboard';
import Image from 'next/image';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const Application = ({ data }) => {
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
      <div className="pt-24 h-screen">
        {profile.UserApplication.map((application) => {
          return (
            <div className="flex flex-col justify-center">
              <div className="basis-full flex flex-row gap-2 px-3 py-5 mx-6 mb-2 bg-white border-solid border-black border-2">
                <div className="basis-1/4">
                  {application.Company.logo != null && (
                    <Image loader={() => application.Company.logo} className="object-cover object-center" src={application.Company.logo} alt="Alternative text" width={80} height={80} />
                  )}
                  {application.Company.logo == null && <Image className=" object-cover object-center" src="/img/blank-pp.jpg" alt="Alternative text" width={80} height={80} />}
                </div>
                <div className="basis-1/2">
                  <p className="font-bold text-2xl">{application.title}</p>
                  <p className="text-lg text-blue-600">{application.Company.company_name}</p>
                  <p className="text-lg text-green-600">{application.Application.status}</p>
                </div>
                {/* <div className="basis-1/2">
                  <p>{application.Application.description}</p>
                </div> */}
                <div className="basis-1/2">
                  <button
                    onClick={() => {
                      setIsDelete(true);
                      handleDelete(application.id);
                    }}
                    className="my-4 bg-white p-2 px-4 rounded-md font-semibold text-blue-500 border border-slate-300 hover:border-blue-500"
                  >
                    Cancel
                  </button>
                  <button className="my-4 bg-white p-2 px-4 rounded-md font-semibold text-blue-500 border border-slate-300 hover:border-blue-500">Detail</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Application;

export const getServerSideProps = async (context) => {
  const { token } = context.req.cookies;

  const result = await fetch('http://localhost:8000/users/job-application', {
    headers: { Authorization: 'Bearer ' + token },
  });
  const data = await result.json();

  console.log(data);

  return {
    props: {
      data,
    },
  };
};
