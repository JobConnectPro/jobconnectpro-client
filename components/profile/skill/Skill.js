import { Fragment, useEffect, useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiAddLine } from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';

import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import SkillAddForm from './AddForm';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

const UserSkill = ({ profile, isAdd, setIsAdd, isDelete, setIsDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        setIsModalOpen(false);
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
                  <>
                    <div key={project.id}>
                      <div className="grid grid-cols-2 border border-gray-200 rounded-lg p-4">
                        <div>
                          <p className="text-lg">{project.skill}</p>
                          <p className="text-sm text-gray-500">{project.UserSkill.level}</p>
                        </div>
                        <div className="self-center text-end">
                          <button
                            onClick={() => {
                              setIsModalOpen(true);
                            }}
                          >
                            <FaTrashAlt size={18} className="text-gray-400 hover:text-blue-900" />{' '}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Modal Confirmation */}
                    <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal" overlayClassName="modal-overlay">
                      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-20 transition-opacity" />
                        <div className="fixed inset-0 z-10 overflow-y-auto">
                          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex items-center">
                                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                      />
                                    </svg>
                                  </div>
                                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                                      CONFIRMATION
                                    </h3>
                                    <div className="">
                                      <p className="text-sm text-gray-500">Are you sure you want to proceed? This data will be removed. This action cannot be undone.</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                  type="button"
                                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                  onClick={() => {
                                    setIsDelete({ ...isDelete, skill: true });
                                    handleDelete(project.id);
                                  }}
                                >
                                  Delete
                                </button>
                                <button
                                  type="button"
                                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                  onClick={() => setIsModalOpen(false)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </>
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
