BsFillMortarboardFill;
import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import { getApplicant } from '@/modules/fetch';
import { BsFillMortarboardFill } from 'react-icons/bs';

const ProjectApplicant = () => {
  const router = useRouter();
  const applicantId = router.query.applicantid;
  const jobId = router.query.id;
  const [applicant, setApplicant] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getApplicant(applicantId, jobId);
      setApplicant(res);
    };
    fetchData();
  }, [applicantId]);

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex">
            <BsFillMortarboardFill size={30} />
            <p className="ml-2 text-lg mb-4">Project</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {applicant.Projects?.map((project) => {
              return (
                <div className="border border-blue-300 rounded-lg py-4 px-6" key={project.id}>
                  <h1 className="text-blue-500 text-lg">{project.project_name}</h1>
                  <p className="font-bold">{project.role}</p>
                  <p className="text-sm mb-3 text-gray-500">
                    {' '}
                    {new Date(project.start_date).toLocaleDateString('id-ID', {
                      month: 'long',
                      year: 'numeric',
                    })}{' '}
                    -{' '}
                    {new Date(project.end_date).toLocaleDateString('id-ID', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-sm mb-3 text-gray-500">{project.link}</p>
                  {project.description}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectApplicant;
