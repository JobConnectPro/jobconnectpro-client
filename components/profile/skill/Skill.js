import { Fragment, useEffect, useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiAddLine } from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';

import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import SkillAddForm from './AddForm';

const UserSkill = ({ profile, isAdd, setIsAdd, isDelete, setIsDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const handleDelete = (skillId) => {
    axios
      .delete(`http://localhost:8000/users/skill/${skillId}`, {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        toast.success(res.data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setIsDelete({ ...isDelete, skill: false });
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
          Skill <div>{isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
        </button>
        <button className="w-2/12 flex items-center text-center border-l border-slate-300 bg-blue-700">
          {!isAdd.skill && (
            <div
              className="w-[100%] h-full flex p-2 justify-between items-center text-end bg-blue-700 hover:bg-blue-600"
              onClick={() => {
                setIsAdd({ ...isAdd, skill: true });
              }}
            >
              ADD
              <RiAddLine size={25} />
            </div>
          )}
        </button>
      </div>

      <div className={isOpen ? 'hidden' : 'w-full bg-white py-4 rounded-b-lg'}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 justify-center mx-6 items-start">
          {!isAdd.skill && (
            <>
              {profile.UserSkilled.map((project) => {
                return (
                  <div key={project.id}>
                    <div className="grid grid-cols-2 border border-gray-200 rounded-lg p-4">
                      <div>
                        <p className="text-lg">{project.skill}</p>
                        <p className="text-sm text-gray-500">{project.UserSkill.level}</p>
                      </div>
                      <div className="self-center text-end">
                        <button
                          onClick={() => {
                            setIsDelete({ ...isDelete, skill: true });
                            handleDelete(project.id);
                          }}
                        >
                          <FaTrashAlt size={18} className="text-gray-400 hover:text-blue-900" />{' '}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
          {isAdd.skill && <SkillAddForm isAdd={isAdd} setIsAdd={setIsAdd} currentId={currentId} setCurrentId={setCurrentId} />}
        </div>
      </div>
    </div>
  );
};

export default UserSkill;
