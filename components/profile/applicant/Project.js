BsFillMortarboardFill;
import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import { getApplicant } from '@/modules/fetch';
import { BsFillBriefcaseFill, BsFillMortarboardFill } from 'react-icons/bs';
import Image from 'next/image';

const ProjectApplicant = () => {
  const router = useRouter();
  const applicantId = router.query.applicantid;
  const jobId = router.query.id;
  //   console.log(applicantId, jobId);
  const [applicant, setApplicant] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getApplicant(applicantId, jobId);

      setApplicant(res);
    };
    fetchData();
  }, [applicantId]);

  console.log(applicant);

  return (
    <>
      <div>
        <div className="flex mt-5">
          <BsFillMortarboardFill size={30} />
          <p className="ml-2 text-lg">Project</p>
        </div>
        <div>
          <table className="table-auto w-full">
            <tbody>
              {applicant.Projects?.map((project) => {
                return (
                  <tr className="border-t border-blue-300 font-semibold hover:bg-slate-50">
                    <Fragment key={project.id}>
                      <td className="px-2 py-6">
                        {new Date(project.start_date).toLocaleDateString(
                          'id-ID',
                          {
                            month: 'long',
                            year: 'numeric',
                          }
                        )}{' '}
                        -{' '}
                        {new Date(project.end_date).toLocaleDateString(
                          'id-ID',
                          {
                            month: 'long',
                            year: 'numeric',
                          }
                        )}
                      </td>
                      <td className="">
                        <p className="font-bold text-lg">
                          {project.project_name}
                        </p>
                        <p className="font-bold text-slate-500">
                          {project.role}
                        </p>
                        <p className="text-sm text-slate-500">{project.link}</p>
                        <p className="text-justify">{project.description}</p>
                      </td>
                    </Fragment>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProjectApplicant;
