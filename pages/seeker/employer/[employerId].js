import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Dashboard';
import Link from 'next/link';

const EmployerDetail = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  const [employer, setEmployer] = useState({ ...data });

  return (
    <Layout>
      <div className="bg-white">{employer.name}</div>
      <div className="flex flex-wrap">
        {employer.Jobs.map((job) => {
          return (
            <div className="basis-1/4 bg-white">
              <p>{job.title}</p>
              <p>{job.type}</p>
              <p>{job.Company.company_name}</p>
              <Link href={`/seeker/job/${job.id}`}>
                <button className="my-4 bg-white p-2 px-4 rounded-md font-semibold text-blue-500 border border-slate-300 hover:border-blue-500">Detail</button>
              </Link>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default EmployerDetail;

export const getServerSideProps = async (context) => {
  const { token } = context.req.cookies;
  const { employerId } = context.query;

  const result = await fetch(`http://localhost:8000/users/employer/${employerId}`, {
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
