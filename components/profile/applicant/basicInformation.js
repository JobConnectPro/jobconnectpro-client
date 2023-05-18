import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import { getApplicant } from '@/modules/fetch';
import { MdEmail, MdPeopleAlt, MdContactPhone, MdCalendarMonth, MdLocationOn } from 'react-icons/md';

import Image from 'next/image';
const BasicInfomationApplicant = () => {
  const router = useRouter();
  const applicantId = router.query.applicantid;
  const jobId = router.query.id;
  const [applicant, setApplicant] = useState([]);

  const date = new Date(applicant.birthday);
  const birthday = date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getApplicant(applicantId, jobId);
      setApplicant(res);
    };
    fetchData();
  }, [applicantId]);

  return (
    <>
      <div className="bg-white border border-slate-200 py-3 rounded-lg overflow-hidden">
        <div className="flex items-center justify-center pt-6">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
            {applicant.photo != null && (
              <Image loader={() => applicant.photo} className="w-full h-full object-cover object-center" src={applicant.photo} alt="Alternative text" width={100} height={100} />
            )}
            {applicant.photo == null && <Image className="w-full h-full object-cover object-center" src="/img/blank-pp.jpg" alt="Alternative text" width={100} height={100} />}
          </div>
        </div>
        <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <div>
              <h1 className="font-semibold text-lg md:text-2xl">{applicant.name}</h1>
            </div>
            <div className="space-y-1">
              <p className="flex items-center">
                <span className="mr-2">
                  <MdEmail size={18} />
                </span>
                <span>{applicant.email}</span>
              </p>
              <p className="flex items-center">
                <span className="mr-2">
                  <MdPeopleAlt size={18} />
                </span>
                <span>{applicant.gender}</span>
              </p>
              <p className="flex items-center">
                <span className="mr-2">
                  <MdContactPhone size={18} />
                </span>
                <span>{applicant.phone}</span>
              </p>
              <p className="flex items-center">
                <span className="mr-2">
                  <MdCalendarMonth size={18} />
                </span>
                <span>{birthday}</span>
              </p>
              <p className="flex">
                <span className="mr-2">
                  <MdLocationOn size={18} />
                </span>
                <span className="leading-tight">{applicant.address}</span>
              </p>
            </div>
          </div>
          <div className="col-span-1 self-end items-end justify-self-end mt-5 lg:mt-0">
            <a href={applicant.resume} target="_blank">
              <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-4 px-5 rounded-lg flex items-center space-x-2">Applicant Resume</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicInfomationApplicant;
