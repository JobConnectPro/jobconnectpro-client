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
      <div className="w-full flex font-bold text-white">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="w-full flex items-center justify-between p-2 bg-blue-500 hover:bg-blue-600 pl-6"
        >
          Work Experience
          <div>{isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
        </button>
        <button className="w-2/12 flex items-center text-center border-l border-slate-300 bg-blue-500">
          {!isAdd.workExperience && !isEdit.workExperience && (
            <div
              className="w-[100%] h-full flex p-2 justify-between items-center text-end bg-blue-500 hover:bg-blue-600"
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
      <div className={isOpen ? 'hidden' : ''}>
        <div className="w-full bg-slate-100 ">
          {!isAdd.workExperience && !isEdit.workExperience && (
            <>
              <table className="table-auto w-full">
                <tbody>
                  {profile.WorkExperiences.map((workExperience) => {
                    return (
                      <tr className="border-t border-blue-300 font-semibold hover:bg-slate-50" key={workExperience.id}>
                        <Fragment>
                          <td className="px-2 py-6">
                            {new Date(workExperience.start_date).toLocaleDateString('id-ID', {
                              month: 'long',
                              year: 'numeric',
                            })}{' '}
                            -{' '}
                            {new Date(workExperience.end_date).toLocaleDateString('id-ID', {
                              month: 'long',
                              year: 'numeric',
                            })}
                          </td>
                          <td className="">
                            {workExperience.job_title} at {workExperience.company}
                          </td>
                          <td className="text-right p-2">
                            {/* edit button */}
                            <button
                              onClick={() => {
                                setIsEdit({ ...isEdit, workExperience: true });
                                setCurrentId(workExperience.id);
                              }}
                              className="bg-yellow-400 hover:bg-yellow-500 text-slate-500 font-bold mx-4 p-1 rounded-md"
                            >
                              <RiEdit2Fill size={20} />
                            </button>
                            {/* end of edit button */}
                            {/* delete button */}
                            <button
                              onClick={() => {
                                setIsDelete({ ...isDelete, workExperience: true });
                                handleDelete(workExperience.id);
                              }}
                              className="bg-red-500 hover:bg-red-700 text-slate-300 font-bold p-1 rounded-md"
                            >
                              <FaTrashAlt size={20} />
                            </button>
                            {/* end of delete button */}
                          </td>
                        </Fragment>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
