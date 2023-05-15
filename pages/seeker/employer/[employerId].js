import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Dashboard';
import Link from 'next/link';
import { MdEmail, MdPeopleAlt, MdContactPhone, MdCalendarMonth, MdLocationOn } from 'react-icons/md';

import Image from 'next/image';

const EmployerDetails = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  const [employer, setEmployer] = useState({ ...data });

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

  const date = new Date(employer.birthday);
  const birthday = date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Layout>
      <div className="mt-[22px] h-screen">
        <h1 className="mx-6 mb-3 text-3xl font-bold">Recruiter Detail</h1>
        <div className="flex flex-row flex-wrap justify-center mx-6">
          <div className="basis-full lg:basis-1/2">
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg overflow-hidden p-8 mb-2">
              <div className="flex items-center justify-center">
                {employer.photo != null && <Image loader={() => employer.photo} className="rounded-full object-center" src={employer.photo} alt="Profile Picture" width={100} height={100} />}
                {employer.photo == null && <Image className="rounded-full object-center" src="/img/blank-pp.jpg" alt="Profile Picture" width={100} height={100} />}
              </div>
              <div className="px-6 py-4 mb-1">
                <div className="font-bold text-xl">{employer.name}</div>
                <p className="flex items-center">
                  <span className="mr-2">
                    <MdEmail size={18} />
                  </span>
                  <span className="text-gray-700">{employer.email}</span>
                </p>
                <p className="flex items-center">
                  <span className="mr-2">
                    <MdCalendarMonth size={18} />
                  </span>
                  <span className="text-gray-700">{birthday}</span>
                </p>
                <p className="flex items-center">
                  <span className="mr-2">
                    <MdPeopleAlt size={18} />
                  </span>
                  <span className="text-gray-700">{employer.gender}</span>
                </p>
              </div>
              <div className="text-md text-gray-500 mb-2">Recruiter in:</div>
              <div className="flex flex-row w-full items-center justify-center">
                {employer.Companies.map((company) => {
                  return (
                    <div className="basis-1/2 flex flex-col w-full justify-center items-center" key={company.id}>
                      {company.logo != null && (
                        <Image loader={() => company.logo} className="inline-block h-10 object-cover object-center" src={company.logo} alt="Company Logo" width={80} height={80} />
                      )}
                      {company.logo == null && <Image className="inline-block h-10 object-cover object-center" src="/img/blank-pp.jpg" alt="Company Logo" width={80} height={80} />}
                      <Link href={`/seeker/companies/${company.id}`}>
                        <div className="text-black hover:text-blue-500">{company.company_name}</div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="basis-full lg:basis-1/2">
            <div className="grid grid-cols-1 grid-flow-row justify-start gap-2 lg:ml-3">
              {employer.Jobs.map((job) => {
                return (
                  <div className="bg-white rounded-lg border-slate-200 border p-6 flex items-center justify-between" key={job.id}>
                    <div className="flex items-center">
                      {job.Company.logo != null && (
                        <Image loader={() => job.Company.logo} className="mr-4 object-cover object-center" src={job.Company.logo} alt="Alternative text" width={60} height={60} />
                      )}
                      {job.Company.logo == null && <Image className="mr-4 object-cover object-center" src="/img/blank-pp.jpg" alt="Alternative text" width={60} height={60} />}
                      <div>
                        <Link href={`/seeker/job/${job.id}`}>
                          <h2 className="text-lg font-semibold text-black hover:text-blue-900">{job.title}</h2>
                        </Link>
                        <Link href={`/seeker/companies/${job.Company.id}`}>
                          <p className="text-blue-500 hover:text-blue-900">{job.Company.company_name}</p>
                        </Link>
                        <p className="text-gray-500 text-sm mb-3">
                          {job.location} &#x2022; {job.type}
                        </p>
                        <p className="text-gray-500 text-xs">Posted {diffForHumans(job.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployerDetails;

export const getServerSideProps = async (context) => {
  const { role, token } = context.req.cookies;
  const { employerId } = context.query;

  const result = await fetch(`http://localhost:8000/users/employer/${employerId}`, {
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
