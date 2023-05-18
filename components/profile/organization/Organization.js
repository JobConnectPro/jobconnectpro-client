import { Fragment, useEffect, useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiEdit2Fill, RiAddLine } from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';

import axios from 'axios';
import Cookies from 'js-cookie';
import OrganizationForm from './Form';
import { toast } from 'react-toastify';

const Organization = ({ profile, isAdd, setIsAdd, isEdit, setIsEdit, isDelete, setIsDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const handleDelete = (organizationId) => {
    axios
      .delete(`http://localhost:8000/organizations/${organizationId}`, {
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
        setIsDelete({ ...isDelete, organization: false });
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
          Organization
          <div>{isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
        </button>
        <button className="w-2/12 flex items-center text-center border-l border-slate-300 bg-blue-700">
          {!isAdd.organization && !isEdit.organization && (
            <div
              className="w-[100%] h-full flex p-2 justify-between items-center text-end bg-blue-700 hover:bg-blue-600"
              onClick={() => {
                setIsAdd({ ...isAdd, organization: true });
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
          {!isAdd.organization && !isEdit.organization && (
            <>
              {profile.Organizations.map((organization) => {
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-4 mt-4 pb-4 justify-center items-start px-6 border-b" key={organization.id}>
                    <div className="flex">
                      <p className="text-gray-400">{new Date(organization.start_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}</p>
                      <p className="text-gray-400 mx-1">
                        {''}-{''}
                      </p>
                      <p className="text-gray-400">{new Date(organization.end_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div className="col-span-1 lg:col-span-2">
                      <p className="text-lg">{organization.organization}</p>
                      <p className="text-gray-700">{organization.role}</p>
                      <p className="text-justify text-gray-500">{organization.description}</p>
                    </div>
                    <div className="order-first text-end lg:order-last space-x-2">
                      <button
                        onClick={() => {
                          setIsDelete({ ...isDelete, organization: true });
                          handleDelete(organization.id);
                        }}
                      >
                        <FaTrashAlt size={18} className="text-gray-400 hover:text-blue-900" />{' '}
                      </button>
                      <button
                        onClick={() => {
                          setIsEdit({ ...isEdit, organization: true });
                          setCurrentId(organization.id);
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
          {isAdd.organization && !isEdit.organization && <OrganizationForm isAdd={isAdd} setIsAdd={setIsAdd} currentId={currentId} setCurrentId={setCurrentId} />}
          {isEdit.organization && !isAdd.organization && <OrganizationForm isEdit={isEdit} setIsEdit={setIsEdit} currentId={currentId} setCurrentId={setCurrentId} />}
        </div>
      </div>
    </div>
  );
};

export default Organization;
