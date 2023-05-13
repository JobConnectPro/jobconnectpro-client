import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import { getApplicant } from '@/modules/fetch';
import { BsFillBriefcaseFill, BsFillMortarboardFill } from 'react-icons/bs';
import Image from 'next/image';

const EducationApplicant = () => {
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
          <p className="ml-2 text-lg">Education</p>
        </div>
        <div>
          <table className="table-auto w-full">
            <tbody>
              {applicant.Education?.map((education) => {
                return (
                  <tr className="border-t border-blue-300 font-semibold hover:bg-slate-50">
                    <Fragment key={education.id}>
                      <td className="px-2 py-6">
                        {new Date(education.start_date).toLocaleDateString(
                          'id-ID',
                          {
                            month: 'long',
                            year: 'numeric',
                          }
                        )}{' '}
                        -{' '}
                        {new Date(education.end_date).toLocaleDateString(
                          'id-ID',
                          {
                            month: 'long',
                            year: 'numeric',
                          }
                        )}
                      </td>
                      <td className="">
                        <p className="font-bold text-lg">{education.school}</p>
                        <p className="font-bold text-slate-500">
                          {education.Attainment.attainment}
                        </p>
                        <p className="text-justify">{education.major}</p>
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

export default EducationApplicant;
