import Image from 'next/image';
import { useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiEdit2Fill, RiUpload2Fill, Ri24HoursLine } from 'react-icons/ri';
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

  const diffForHumans = (date) => {
    const now = new Date();
    const newDate = new Date(date);
    const diffInMs = Math.abs(now - newDate);
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'today';
    } else if (diffInDays === 1) {
      return 'yesterday';
    } else {
      return `${diffInDays} days ago`;
    }
  };

  return (
    <div className="w-full p-4 pt-6">
      <div className="w-full flex text-white">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="w-full flex items-center justify-between p-2 bg-blue-700 hover:bg-blue-600 pl-6 uppercase text-lg rounded-tl-lg"
        >
          Basic Information
          <div>{isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
        </button>
        <button className="w-2/12 flex items-center text-center border-l border-slate-300 bg-blue-700">
          {!isEdit.basicInformation && !isUpload && (
            <div
              className="w-[100%] h-full flex p-2 justify-between items-center text-end bg-blue-700 hover:bg-blue-600"
              onClick={() => {
                setIsEdit({ ...isEdit, basicInformation: true });
              }}
            >
              EDIT
              <RiEdit2Fill size={20} />
            </div>
          )}
        </button>
        <button className="w-2/12 flex items-center text-center border-l border-slate-300 bg-blue-700">
          {!isEdit.basicInformation && !isUpload && (
            <div
              className="w-[100%] h-full flex p-2 justify-between items-center text-end bg-blue-700 hover:bg-blue-600"
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 items-center">
          {!isEdit.basicInformation && !isUpload && (
            <>
              <div>
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto">
                  {profile.photo != null && (
                    <Image loader={() => profile.photo} className="w-full h-full object-cover object-center" src={profile.photo} alt="Profile Picture" width={150} height={150} />
                  )}
                  {profile.photo == null && <Image className="w-full h-full object-cover object-center" src="/img/blank-pp.jpg" alt="Profile Picture" width={150} height={150} />}
                </div>
              </div>
              <div className="col-span-1 lg:col-span-3 mx-10 mt-5 lg:mx-0 lg:mt-0">
                <h1 className="text-2xl mb-2">{profile.name}</h1>
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-1">
                  <div className="space-y-1 col-span-1 lg:col-span-2">
                    <p className="flex items-center">
                      <span className="mr-2">
                        <MdEmail size={18} className="text-gray-700" />
                      </span>
                      <span className="text-gray-500">{profile.email}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">
                        <MdPeopleAlt size={18} className="text-gray-700" />
                      </span>
                      <span className="text-gray-500">{profile.gender}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">
                        <MdContactPhone size={18} className="text-gray-700" />
                      </span>
                      <span className="text-gray-500">{profile.phone}</span>
                    </p>
                  </div>
                  <div className="space-y-1 col-span-1 lg:col-span-5">
                    <p className="flex items-center">
                      <span className="mr-2">
                        <MdCalendarMonth size={18} className="text-gray-700" />
                      </span>
                      <span className="text-gray-500">{birthday}</span>
                    </p>
                    <p className="flex">
                      <span className="mr-2">
                        <MdLocationOn size={18} className="text-gray-700" />
                      </span>
                      <span className="text-gray-500">{profile.address}</span>
                    </p>
                    <p className="flex">
                      <span className="mr-2">
                        <Ri24HoursLine size={18} className="text-gray-700" />
                      </span>
                      <span className="text-gray-500">Registered {diffForHumans(profile.createdAt)}</span>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
          {isEdit.basicInformation && !isUpload && <BasicInformationEditForm isEdit={isEdit} setIsEdit={setIsEdit} />}
          {isUpload && !isEdit.basicInformation && <BasicInformationUploadForm isUpload={isUpload} setIsUpload={setIsUpload} />}
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
