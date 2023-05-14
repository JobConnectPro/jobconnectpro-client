BsFillMortarboardFill;
import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import { getApplicant } from '@/modules/fetch';
import { BsFillMortarboardFill } from 'react-icons/bs';

const SkillApplicant = () => {
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
      <div class="bg-white border border-slate-200 rounded-lg overflow-hidden mb-10">
        <div className="px-6 py-4">
          <div className="flex">
            <BsFillMortarboardFill size={30} />
            <p className="ml-2 text-lg mb-4">Skill</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {applicant.UserSkilled?.map((skill) => {
              return (
                <div className="border border-blue-300 rounded-lg py-4 px-6" key={skill.id}>
                  <h1 className="text-blue-500 text-lg">{skill.skill}</h1>
                  <p className="font-bold">{skill.UserSkill.level}</p>
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
