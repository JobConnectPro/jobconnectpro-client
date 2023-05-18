import { Fragment, useEffect, useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiEdit2Fill, RiAddCircleLine, RiAddLine, RiSubtractLine } from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';

import axios from 'axios';
import Cookies from 'js-cookie';
import WorkExperienceForm from './Form';
import { toast } from 'react-toastify';

const WorkExperience = ({ profile, isAdd, setIsAdd, isEdit, setIsEdit, isDelete, setIsDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const handleDelete = (workExperienceId) => {
    axios
      .delete(`http://localhost:8000/work-experiences/${workExperienceId}`, {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        toast.success(res.data.message, {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setIsDelete({ ...isDelete, workExperience: false });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
  };

  return (
    <div className="w-full p-4 pt-0">
      <div className="w-full flex text-white">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="w-full flex items-center justify-between p-2 bg-blue-700 hover:bg-blue-600 pl-6 uppercase text-lg rounded-tl-lg"
        >
          Work Experience
          <div>{isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
        </button>
        <button className="w-2/12 flex items-center text-center border-l border-slate-300 bg-blue-700">
          {!isAdd.workExperience && !isEdit.workExperience && (
            <div
              className="w-[100%] h-full flex p-2 justify-between items-center text-end bg-blue-700 hover:bg-blue-600"
              onClick={() => {
                setIsAdd({ ...isAdd, workExperience: true });
              }}
            >
              ADD
              <RiAddLine size={25} />
            </div>
          )}
        </button>
      </div>
      <div className={isOpen ? 'hidden' : 'w-full bg-white rounded-b-lg'}>
        <div className="grid grid-cols-1 justify-center items-start">
          {!isAdd.workExperience && !isEdit.workExperience && (
            <>
              {profile.WorkExperiences.map((workExperience) => {
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-4 mt-4 pb-4 justify-center items-start px-6 border-b" key={workExperience.id}>
                    <div className="flex">
                      <p className="text-gray-400">{new Date(workExperience.start_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}</p>
                      <p className="text-gray-400 mx-1">
                        {''}-{''}
                      </p>
                      <p className="text-gray-400">{new Date(workExperience.end_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div className="col-span-1 lg:col-span-2">
                      <p className="text-lg">
                        {workExperience.job_title} at {workExperience.company}
                      </p>
                      <p className="text-justify text-gray-500">{workExperience.description}</p>
                    </div>
                    <div className="order-first text-end lg:order-last space-x-2">
                      <button
                        onClick={() => {
                          setIsDelete({ ...isDelete, workExperience: true });
                          handleDelete(workExperience.id);
                        }}
                      >
                        <FaTrashAlt size={18} className="text-gray-400 hover:text-blue-900" />
                      </button>
                      <button
                        onClick={() => {
                          setIsEdit({ ...isEdit, workExperience: true });
                          setCurrentId(workExperience.id);
                        }}
                      >
                        <RiEdit2Fill size={18} className="text-blue-700 hover:text-blue-900" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
          {isAdd.workExperience && !isEdit.workExperience && <WorkExperienceForm isAdd={isAdd} setIsAdd={setIsAdd} currentId={currentId} setCurrentId={setCurrentId} />}
          {isEdit.workExperience && !isAdd.workExperience && <WorkExperienceForm isEdit={isEdit} setIsEdit={setIsEdit} currentId={currentId} setCurrentId={setCurrentId} />}
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
