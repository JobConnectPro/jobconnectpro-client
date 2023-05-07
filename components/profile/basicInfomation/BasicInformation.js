import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiEdit2Fill } from 'react-icons/ri';
import { MdEmail, MdPeopleAlt, MdContactPhone, MdCalendarMonth, MdLocationOn } from 'react-icons/md';
import BasicInformationEditForm from './EditForm';
import Cookies from 'js-cookie';

const BasicInformation = ({ userProfile }) => {
  const [profile, setProfile] = useState({ ...userProfile });
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const date = new Date(profile.birthday);
  const birthday = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  useEffect(() => {
    axios
      .get('http://localhost:8000/users/profile', {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setProfile({ ...res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isEdit]);

  return (
    <div className="w-full p-4 pt-24">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="w-full flex items-center justify-between p-2 bg-blue-500 hover:bg-blue-600"
      >
        Basic Information
        <div>{isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
      </button>
      <div className={isOpen ? 'hidden' : 'w-full bg-white py-8'}>
        <div className="flex flex-row flex-wrap justify-center md:justify-start items-center">
          {/* basic information */}
          {!isEdit && (
            <>
              {/* profile pict */}
              <div className="basis-full md:basis-1/5">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
                  <Image loader={() => profile.photo} className="w-full h-full object-cover object-center" src={profile.photo} alt="Alternative text" width={100} height={100} />
                </div>
              </div>
              {/* end of profile pict */}
              <div className="basis-full md:basis-3/5 flex flex-col flex-wrap">
                <div>
                  <h1 className="font-semibold text-sm md:text-2xl">
                    {profile.name}
                    {/* edit button */}
                    <button
                      onClick={() => {
                        setIsEdit(true);
                      }}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold p-1 rounded-md ml-2"
                    >
                      <RiEdit2Fill size={15} />
                    </button>
                    {/* end of edit button */}
                  </h1>
                </div>
                <div className="space-y-1">
                  <p class="flex items-center">
                    <span class="mr-2">
                      <MdEmail size={18} />
                    </span>
                    <span>{profile.email}</span>
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">
                      <MdPeopleAlt size={18} />
                    </span>
                    <span>{profile.gender}</span>
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">
                      <MdContactPhone size={18} />
                    </span>
                    <span>{profile.phone}</span>
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
                    <span className="md:w-1/2 leading-tight">{profile.address}</span>
                  </p>
                </div>
              </div>
            </>
          )}
          {/* end of basic information */}
          {/* form */}
          {isEdit && <BasicInformationEditForm isEdit={isEdit} setIsEdit={setIsEdit} />}
          {/* end of form */}
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
