import Layout from '@/components/layout/Dashboard';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Employers = ({ data }) => {
  const [employers, setEmployers] = useState([...data.data]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);

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
    axios
      .get('http://localhost:8000/users/employer', {
        params: {
          page: currentPage,
          limit: perPage,
        },
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setEmployers([...res.data.data]);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage, perPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button key={i} className={`border px-4 py-2 rounded ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`} onClick={() => handlePageChange(i)}>
          {i}
        </button>
      );
    }
    return <div className="flex items-center justify-center mt-4">{pages}</div>;
  };

  return (
    <Layout>
      <div className="mt-[22px] h-screen">
        <h1 className="mx-6 mb-6 text-3xl font-bold">Recruiter</h1>
        {/* pagination */}
        <div className="flex justify-between mb-4 mx-6">
          <div className="flex items-center mr-2">
            <span>Show:</span>
            <select className="mx-2 border rounded-lg p-1" value={perPage} onChange={handlePerPageChange}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
        {/* pagination */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-row justify-start gap-2 mx-6">
          {employers.map((employer) => {
            return (
              <div className="bg-white rounded-lg border-slate-200 border overflow-hidden pt-4" key={employer.id}>
                <div className="flex items-center justify-center h-36 bg-white">
                  <div className="w-28 h-28 rounded-full overflow-hidden mx-auto">
                    {employer.photo != null && (
                      <Image loader={() => employer.photo} className="w-full h-full object-cover object-center" src={employer.photo} alt="Profile Picture" width={100} height={100} />
                    )}
                    {employer.photo == null && <Image className="w-full h-full object-cover object-center" src="/img/blank-pp.jpg" alt="Profile Picture" width={100} height={100} />}
                  </div>
                </div>
                <div className="px-6 pt-2 pb-7">
                  <Link href={`/seeker/employer/${employer.id}`}>
                    <div className="text-lg font-semibold text-black hover:text-blue-900">{employer.name}</div>
                  </Link>
                  <div className="text-gray-500 text-sm mb-3">Registered {diffForHumans(employer.createdAt)}</div>
                  <div className="text-gray-600 text-sm">Recruiter in:</div>
                  <div className="flex flex-col">
                    {employer.Companies.map((company) => {
                      return (
                        <div className="mt-2" key={company.id}>
                          {company.logo != null && <Image loader={() => company.logo} className="inline-block" src={company.logo} alt="Company Logo" width={40} height={40} />}
                          {company.logo == null && (
                            <Image className="inline-block" src="/img/blank-pp.jpg" alt="Company Logo" width={40} height={40} />
                          )}
                          <Link href={`/seeker/companies/${company.id}`}>
                            <div className="inline-block pl-2 text-sm text-blue-500 hover:text-blue-900">{company.company_name}</div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-4">{renderPagination()}</div>
      </div>
    </Layout>
  );
};

export default Employers;

export const getServerSideProps = async (context) => {
  const { role, token } = context.req.cookies;

  const result = await fetch('http://localhost:8000/users/employer', {
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
