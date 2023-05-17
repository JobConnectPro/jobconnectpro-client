import { Fragment, useEffect, useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiEdit2Fill, RiAddLine } from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';

import axios from 'axios';
import Cookies from 'js-cookie';
import ProjectForm from './Form';
import { toast } from 'react-toastify';

const Project = ({ profile, isAdd, setIsAdd, isEdit, setIsEdit, isDelete, setIsDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const handleDelete = (projectId) => {
    axios
      .delete(`http://localhost:8000/projects/${projectId}`, {
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
        setIsDelete({ ...isDelete, project: false });
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
          Project
          <div>{isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
        </button>
        <button className="w-2/12 flex items-center text-center border-l border-slate-300 bg-blue-700">
          {!isAdd.project && !isEdit.project && (
            <div
              className="w-[100%] h-full flex p-2 justify-between items-center text-end bg-blue-700 hover:bg-blue-600"
              onClick={() => {
                setIsAdd({ ...isAdd, project: true });
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
          {!isAdd.project && !isEdit.project && (
            <>
              {profile.Projects.map((project) => {
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-4 mt-4 pb-4 justify-center items-start px-10 border-b" key={project.id}>
                    <div className="flex">
                      <p className="text-gray-400">{new Date(project.start_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}</p>
                      <p className="text-gray-400 mx-1">
                        {''}-{''}
                      </p>
                      <p className="text-gray-400">{new Date(project.end_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div className="col-span-1 lg:col-span-2">
                      <p className="text-lg">{project.project_name}</p>
                      <p className="text-gray-7000">{project.role}</p>
                      <p className="text-justify text-gray-500">{project.description}</p>
                    </div>
                    <div className="order-first text-end lg:order-last space-x-2">
                      <button
                        onClick={() => {
                          setIsDelete({ ...isDelete, project: true });
                          handleDelete(project.id);
                        }}
                      >
                        <FaTrashAlt size={18} className="text-gray-400 hover:text-blue-900" />{' '}
                      </button>
                      <button
                        onClick={() => {
                          setIsEdit({ ...isEdit, project: true });
                          setCurrentId(project.id);
                        }}
                      >
                        <RiEdit2Fill size={18} className="text-blue-700 hover:text-blue-900" />{' '}
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
          {isAdd.project && !isEdit.project && <ProjectForm isAdd={isAdd} setIsAdd={setIsAdd} currentId={currentId} setCurrentId={setCurrentId} />}
          {isEdit.project && !isAdd.project && <ProjectForm isEdit={isEdit} setIsEdit={setIsEdit} currentId={currentId} setCurrentId={setCurrentId} />}
        </div>
      </div>
    </div>
  );
};

export default Project;
