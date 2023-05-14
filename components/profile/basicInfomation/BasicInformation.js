import Image from 'next/image';
import { useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiEdit2Fill, RiUpload2Fill } from 'react-icons/ri';
import { MdEmail, MdPeopleAlt, MdContactPhone, MdCalendarMonth, MdLocationOn } from 'react-icons/md';
import BasicInformationEditForm from './EditForm';
import BasicInformationUploadForm from './UploadForm';

const BasicInformation = ({ profile, isEdit, setIsEdit, isUpload, setIsUpload }) => {
  const [isOpen, setIsOpen] = useState(false);

  const date = new Date(profile.birthday);
  const birthday = date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="w-full p-4 pt-6">
      <div className="w-full flex font-bold text-white">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="w-full flex items-center justify-between p-2 bg-blue-500 hover:bg-blue-600 pl-6"
        >
          Basic Information
          <div>{isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
        </button>
        <button className="w-2/12 flex items-center text-center border-l border-slate-300 bg-blue-500">
          {!isEdit.basicInformation && (
            <div
              className="w-[100%] h-full flex p-2 justify-between items-center text-end bg-blue-500 hover:bg-blue-600"
              onClick={() => {
                setIsEdit({ ...isEdit, basicInformation: true });
              }}
            >
              EDIT
              <RiEdit2Fill size={20} />
            </div>
          )}
        </button>
        <button className="w-2/12 flex items-center text-center border-l border-slate-300 bg-blue-500">
          {!isEdit.basicInformation && (
            <div
              className="w-[100%] h-full flex p-2 justify-between items-center text-end bg-blue-500 hover:bg-blue-600"
              onClick={() => {
                setIsUpload(true);
              }}
            >
              UPLOAD
              <RiUpload2Fill size={20} />
            </div>
          )}
        </button>
      </div>

      <div className={isOpen ? 'hidden' : 'w-full bg-white py-8 rounded-b-lg'}>
        <div className="flex flex-row flex-wrap justify-center md:justify-start items-center mx-6">
          {/* basic information */}
          {!isEdit.basicInformation && !isUpload && (
            <>
              {/* profile pict */}
              <div className="basis-full md:basis-1/4 mb-7 md:mb-0">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
                  {profile.photo != null && (
                    <Image loader={() => profile.photo} className="w-full h-full object-cover object-center" src={profile.photo} alt="Profile Picture" width={100} height={100} />
                  )}
                  {profile.photo == null && <Image className="w-full h-full object-cover object-center" src="/img/blank-pp.jpg" alt="Profile Picture" width={100} height={100} />}
                </div>
              </div>
              {/* end of profile pict */}
              <div className="basis-full md:basis-3/5 flex flex-col flex-wrap">
                <div>
                  <h1 className="font-semibold text-sm md:text-2xl">{profile.name}</h1>
                </div>
                <div className="space-y-1">
                  <p className="flex items-center">
                    <span className="mr-2">
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
          {isEdit.basicInformation && !isUpload && <BasicInformationEditForm isEdit={isEdit} setIsEdit={setIsEdit} />}
          {isUpload && !isEdit.basicInformation && <BasicInformationUploadForm isUpload={isUpload} setIsUpload={setIsUpload} />}
          {/* end of form */}
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
