import { Fragment, useEffect, useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiEdit2Fill, RiAddCircleLine } from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';

import axios from 'axios';
import Cookies from 'js-cookie';
import AchievementForm from './Form';
import { toast } from 'react-toastify';

const Achievement = ({ profile, isAdd, setIsAdd, isEdit, setIsEdit, isDelete, setIsDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const handleDelete = (achievementId) => {
    axios
      .delete(`http://localhost:8000/achievements/${achievementId}`, {
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
        setIsDelete({ ...isDelete, achievement: false });
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
        Achievement
        <div>{isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
      </button>
      <div className={isOpen ? 'hidden' : 'w-full bg-white py-4'}>
        {/* add button */}
        {!isAdd.achievement && !isEdit.achievement && (
          <button
            onClick={() => {
              setIsAdd({ ...isAdd, achievement: true });
            }}
            className="bg-green-600 hover:bg-green-700 text-black font-bold p-1 rounded-md mx-10 mb-3"
          >
            <RiAddCircleLine size={15} />
          </button>
        )}
        {/* end of add button */}
        <div className="flex flex-row flex-wrap justify-center items-start mx-10">
          {!isAdd.achievement && !isEdit.achievement && (
            <>
              {profile.Achievements.map((achievement) => {
                return (
                  <Fragment key={achievement.id}>
                    <div className="basis-1/4 mb-5">
                      <p className="font-bold">{new Date(achievement.date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className="basis-1/2 mb-5">
                      <p className="font-bold text-lg">{achievement.title}</p>
                      <p className="font-bold text-slate-500">{achievement.issuer}</p>
                      <p className="text-justify">{achievement.description}</p>
                    </div>
                    <div className="basis-1/4 mb-5 text-center">
                      {/* edit button */}
                      <button
                        onClick={() => {
                          setIsEdit({ ...isEdit, achievement: true });
                          setCurrentId(achievement.id);
                        }}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold p-1 rounded-md ml-2"
                      >
                        <RiEdit2Fill size={15} />
                      </button>
                      {/* end of edit button */}
                      {/* delete button */}
                      <button
                        onClick={() => {
                          setIsDelete({ ...isDelete, achievement: true });
                          handleDelete(achievement.id);
                        }}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold p-1 rounded-md ml-2"
                      >
                        <FaTrashAlt size={15} />
                      </button>
                      {/* end of delete button */}
                    </div>
                  </Fragment>
                );
              })}
            </>
          )}
          {isAdd.achievement && !isEdit.achievement && <AchievementForm isAdd={isAdd} setIsAdd={setIsAdd} currentId={currentId} setCurrentId={setCurrentId} />}
          {isEdit.achievement && !isAdd.achievement && <AchievementForm isEdit={isEdit} setIsEdit={setIsEdit} currentId={currentId} setCurrentId={setCurrentId} />}
        </div>
      </div>
    </div>
  );
};

export default Achievement;
