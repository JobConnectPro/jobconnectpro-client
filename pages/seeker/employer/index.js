import Layout from '@/components/layout/Dashboard';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Employers = ({ data }) => {
  const [employers, setEmployers] = useState([...data.data]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);

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
        console.log(res);
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
      <div className="max-w-2xl mx-auto mb-5">
        <h1 className="text-3xl font-bold text-center mt-8 mb-4">Employers</h1>
        {/* Filter */}
        <div className="flex justify-between mb-4"></div>
        <div className="mb-4"></div>
        <div className="flex justify-between mb-4">
          <div className="flex items-center mr-2">
            <span>Per page:</span>
            <select className="mx-2 border p-1" value={perPage} onChange={handlePerPageChange}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="flex items-center">
            <span>Page:</span>
            <div className="flex items-center ml-2">{renderPagination()}</div>
          </div>
        </div>
        <div className="grid gap-4">
          {employers.map((employer) => {
            return (
              <div className="basis-1/4 bg-white">
                <p>{employer.name}</p>
                {employer.Companies.map((company) => {
                  return (
                    <>
                      <p>{company.company_name}</p>
                    </>
                  );
                })}
                <Link href={`/seeker/employer/${employer.id}`}>
                  <button className="my-4 bg-white p-2 px-4 rounded-md font-semibold text-blue-500 border border-slate-300 hover:border-blue-500">Detail</button>
                </Link>
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
