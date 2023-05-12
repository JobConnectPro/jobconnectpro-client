import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import { getApplicant } from '@/modules/fetch';
import {
  MdEmail,
  MdPeopleAlt,
  MdContactPhone,
  MdCalendarMonth,
  MdLocationOn,
} from 'react-icons/md';
import { BsFillBriefcaseFill } from 'react-icons/bs';

import Image from 'next/image';
const BasicInfomationApplicant = () => {
  const router = useRouter();
  const applicantId = router.query.applicantid;
  const jobId = router.query.id;
  //   console.log(applicantId, jobId);
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

  console.log(applicant);

  return (
    <div className="flex flex-row flex-wrap justify-center md:justify-start items-center mx-10 ">
      {/* basic information */}
      <>
        {/* profile pict */}
        <div className="basis-full md:basis-1/5 mb-7 md:mb-0">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
            {applicant.photo != null && (
              <Image
                loader={() => applicant.photo}
                className="w-full h-full object-cover object-center"
                src={applicant.photo}
                alt="Alternative text"
                width={100}
                height={100}
              />
            )}
            {applicant.photo == null && (
              <Image
                className="w-full h-full object-cover object-center"
                src="/img/blank-pp.jpg"
                alt="Alternative text"
                width={100}
                height={100}
              />
            )}
          </div>
        </div>
        {/* end of profile pict */}
        <div className="basis-full md:basis-3/5 flex flex-col flex-wrap">
          <div>
            <h1 className="font-semibold text-sm md:text-2xl">
              {applicant.name}
            </h1>
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
              <span className="md:w-1/2 leading-tight">
                {applicant.address}
              </span>
            </p>
          </div>
        </div>
      </>
      {/* end of basic information */}
    </div>
  );
};

export default BasicInfomationApplicant;
