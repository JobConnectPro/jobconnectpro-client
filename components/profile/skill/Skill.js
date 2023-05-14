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
      <div className="w-full flex font-bold text-white">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="w-full flex items-center justify-between p-2 bg-blue-500 hover:bg-blue-600 pl-6"
        >
          Skill <div>{isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
        </button>
        <button className="w-2/12 flex items-center text-center border-l border-slate-300 bg-blue-500">
          {!isAdd.skill && (
            <div
              className="w-[100%] h-full flex p-2 justify-between items-center text-end bg-blue-500 hover:bg-blue-600"
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

      <div className={isOpen ? 'hidden' : 'w-full bg-white py-4'}>
        <div className="flex flex-row flex-wrap justify-center items-center gap-2">
          {!isAdd.skill && (
            <>
              {profile.UserSkilled.map((project) => {
                return (
                  <div className="basis-1/4" key={project.id}>
                    <div className="flex flex-row border-solid border-2 border-slate-400 rounded-md p-4">
                      <div className="basis-full">
                        <p className="font-bold text-lg">{project.skill}</p>
                        <p className="text-sm text-slate-500">{project.UserSkill.level}</p>
                      </div>
                      <div className="basis-1/5 self-center text-center">
                        {/* delete button */}
                        <button
                          onClick={() => {
                            setIsDelete({ ...isDelete, skill: true });
                            handleDelete(project.id);
                          }}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold p-1 rounded-md"
                        >
                          <FaTrashAlt size={15} />
                        </button>
                        {/* end of delete button */}
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
