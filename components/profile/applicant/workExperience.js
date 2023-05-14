import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import { getApplicant } from '@/modules/fetch';
import { BsFillBriefcaseFill } from 'react-icons/bs';

const WorkExperienceApplicant = () => {
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
      <div class="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex">
            <BsFillBriefcaseFill size={30} />
            <p className="ml-2 text-lg mb-4">Work Experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {applicant.WorkExperiences?.map((workExperience) => {
              return (
                <div className="border border-blue-300 rounded-lg py-4 px-6" key={workExperience.id}>
                  <h1 className="text-blue-500 text-lg">{workExperience.job_title}</h1>
                  <p className="font-bold">{workExperience.company}</p>
                  <p className="text-sm mb-3 text-gray-500">
                    {' '}
                    {new Date(workExperience.start_date).toLocaleDateString('id-ID', {
                      month: 'long',
                      year: 'numeric',
                    })}{' '}
                    -{' '}
                    {new Date(workExperience.end_date).toLocaleDateString('id-ID', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  {workExperience.description}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkExperienceApplicant;
