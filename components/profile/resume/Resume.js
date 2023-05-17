import { useEffect, useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiEdit2Fill, RiEyeFill } from 'react-icons/ri';
import ResumeEditForm from './EditForm';
import axios from 'axios';
import Cookies from 'js-cookie';

const Resume = ({ profile, isEdit, setIsEdit }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full p-4 pt-0">
      <div className="w-full flex text-white">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="w-full flex items-center justify-between p-2 bg-blue-700 hover:bg-blue-600 pl-6 uppercase text-lg rounded-tl-lg"
        >
          Resume
          <div>{isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
        </button>
        <button className="w-2/12 flex items-center text-center border-l border-slate-300 bg-blue-700">
          {!isEdit.resume && (
            <div
              className="w-[100%] h-full flex p-2 justify-between items-center text-end bg-blue-700 hover:bg-blue-600"
              onClick={() => {
                setIsEdit({ ...isEdit, resume: true });
              }}
            >
              EDIT
              <RiEdit2Fill size={20} />
            </div>
          )}
        </button>
      </div>
      <div className={isOpen ? 'hidden' : 'w-full bg-white py-7 rounded-b-lg'}>
        <div className="flex flex-row flex-wrap justify-start items-center mx-10">
          {!isEdit.resume && (
            <>
              <p className="text-justify text-gray-500 mb-3">
                Note: Your profile is the first thing recruiters see and not your uploaded resume, so make sure your JobConnect profile is as complete and detailed as your uploaded resume.
              </p>
              <button className="bg-blue-500 text-white py-4 px-5 rounded-lg flex items-center space-x-2">
                <RiEyeFill size={20} /> 
                <a href={profile.resume} target="_blank">
                  Resume Preview
                </a>
              </button>
            </>
          )}
          {isEdit.resume && <ResumeEditForm isEdit={isEdit} setIsEdit={setIsEdit} />}
        </div>
      </div>
    </div>
  );
};

export default Resume;
