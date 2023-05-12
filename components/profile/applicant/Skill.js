BsFillMortarboardFill;
import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import { getApplicant } from '@/modules/fetch';
import { BsFillBriefcaseFill, BsFillMortarboardFill } from 'react-icons/bs';
import Image from 'next/image';

const SkillApplicant = () => {
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
          <p className="ml-2 text-lg">Skill</p>
        </div>
        <div>
          <div className="flex flex-row flex-wrap justify-center items-center gap-2">
            {applicant.UserSkilled?.map((project) => {
              return (
                <div className="basis-1/4" key={project.id}>
                  <div className="flex flex-row border-solid border-2 border-slate-400 rounded-md p-4">
                    <div className="basis-full">
                      <p className="font-bold text-lg">{project.skill}</p>
                      <p className="text-sm text-slate-500">
                        {project.UserSkill.level}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillApplicant;
