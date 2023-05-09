import { Fragment, useEffect, useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiEdit2Fill, RiAddCircleLine } from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';

import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import SkillAddForm from './AddForm';

const UserSkill = ({ userProfile }) => {
  const [profile, setProfile] = useState({ ...userProfile });
  const [isOpen, setIsOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:8000/users/profile', {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        console.log(profile);
        setProfile({ ...res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isAdd, isDelete]);

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
        setIsDelete(false);
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
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="w-full flex items-center justify-between p-2 bg-blue-500 hover:bg-blue-600"
      >
        Skills
        <div>{isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
      </button>
      <div className={isOpen ? 'hidden' : 'w-full bg-white py-4'}>
        {/* add button */}
        {!isAdd && (
          <button
            onClick={() => {
              setIsAdd(true);
            }}
            className="bg-green-600 hover:bg-green-700 text-black font-bold p-1 rounded-md mx-10 mb-3"
          >
            <RiAddCircleLine size={15} />
          </button>
        )}
        {/* end of add button */}
        <div className="flex flex-row flex-wrap justify-center items-center gap-2">
          {!isAdd && (
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
                            setIsDelete(true);
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
          {isAdd && <SkillAddForm isAdd={isAdd} setIsAdd={setIsAdd} currentId={currentId} setCurrentId={setCurrentId} />}
        </div>
      </div>
    </div>
  );
};

export default UserSkill;
