import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Dashboard';
import Image from 'next/image';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { RiHeartFill } from 'react-icons/ri';
import Link from 'next/link';

const Bookmarks = ({ data }) => {
  const [profile, setProfile] = useState({ ...data });
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    if (isDelete === false) {
      axios
        .get('http://localhost:8000/users/job-bookmark', {
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

  const handleDelete = (bookmarkId) => {
    axios
      .delete(`http://localhost:8000/users/job-bookmark/${bookmarkId}`, {
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
        <h1 className="mx-6 mb-4 text-3xl font-bold">Bookmark</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row justify-start gap-2 mx-6">
          {profile.UserBookmark.map((bookmark) => {
            return (
              <div className="bg-white rounded-lg border-slate-200 border p-6 flex items-center justify-between">
                <div className="flex items-center">
                  {bookmark.Company.logo != null && (
                    <Image loader={() => bookmark.Company.logo} className="mr-4 object-cover object-center" src={bookmark.Company.logo} alt="Alternative text" width={60} height={60} />
                  )}
                  {bookmark.Company.logo == null && <Image className="mr-4 object-cover object-center" src="/img/blank-pp.jpg" alt="Alternative text" width={60} height={60} />}
                  <div>
                    <Link href={`/seeker/job/${bookmark.id}`}>
                      <h2 className="text-lg font-semibold text-black hover:text-blue-500">{bookmark.title}</h2>
                    </Link>
                    <p className="text-blue-500">{bookmark.Company.company_name}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsDelete(true);
                    handleDelete(bookmark.id);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold p-2 rounded"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Bookmarks;

export const getServerSideProps = async (context) => {
  const { role, token } = context.req.cookies;

  const result = await fetch('http://localhost:8000/users/job-bookmark', {
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
