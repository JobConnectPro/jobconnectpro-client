import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import { getApplicant } from '@/modules/fetch';
import { BsFillBriefcaseFill } from 'react-icons/bs';
import Image from 'next/image';

const WorkExperienceApplicant = () => {
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
          <BsFillBriefcaseFill size={30} />
          <p className="ml-2 text-lg">Work Experience</p>
        </div>
        <div>
          <table className="table-auto w-full">
            <tbody>
              {applicant.WorkExperiences?.map((workExperience) => {
                return (
                  <tr className="border-t border-blue-300 font-semibold hover:bg-slate-50">
                    <Fragment key={workExperience.id}>
                      <td className="px-2 py-6">
                        {new Date(workExperience.start_date).toLocaleDateString(
                          'id-ID',
                          {
                            month: 'long',
                            year: 'numeric',
                          }
                        )}{' '}
                        -{' '}
                        {new Date(workExperience.end_date).toLocaleDateString(
                          'id-ID',
                          {
                            month: 'long',
                            year: 'numeric',
                          }
                        )}
                      </td>
                      <td className="">
                        {workExperience.job_title} at {workExperience.company}
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

export default WorkExperienceApplicant;
