BsFillMortarboardFill;
import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import { getApplicant } from '@/modules/fetch';
import { BsFillBriefcaseFill, BsFillMortarboardFill } from 'react-icons/bs';
import Image from 'next/image';

const OrganizationApplicant = () => {
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
          <p className="ml-2 text-lg">Organization</p>
        </div>
        <div>
          <table className="table-auto w-full">
            <tbody>
              {applicant.Organizations?.map((organization) => {
                return (
                  <tr className="border-t border-blue-300 font-semibold hover:bg-slate-50">
                    <Fragment key={organization.id}>
                      <td className="px-2 py-6">
                        {new Date(organization.start_date).toLocaleDateString(
                          'id-ID',
                          {
                            month: 'long',
                            year: 'numeric',
                          }
                        )}{' '}
                        -{' '}
                        {new Date(organization.end_date).toLocaleDateString(
                          'id-ID',
                          {
                            month: 'long',
                            year: 'numeric',
                          }
                        )}
                      </td>
                      <td className="">
                        <p className="font-bold text-lg">
                          {organization.organization}
                        </p>
                        <p className="font-bold text-slate-500">
                          {organization.role}
                        </p>
                        <p className="text-justify">
                          {organization.description}
                        </p>
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

export default OrganizationApplicant;
