import { Fragment, useEffect, useState } from 'react';
import {
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiEdit2Fill,
  RiAddCircleLine,
} from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';

import axios from 'axios';
import Cookies from 'js-cookie';
import OrganizationForm from './Form';
import { toast } from 'react-toastify';

const Organization = ({ userProfile }) => {
  const [profile, setProfile] = useState({ ...userProfile });
  const [isOpen, setIsOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:8000/users/profile', {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setProfile({ ...res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isAdd, isEdit, isDelete]);

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
        Organization
        <div>
          {isOpen ? (
            <RiArrowDropDownLine size={40} />
          ) : (
            <RiArrowDropUpLine size={40} />
          )}
        </div>
      </button>
      <div className={isOpen ? 'hidden' : 'w-full bg-white py-4'}>
        {/* add button */}
        {!isAdd && !isEdit && (
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
        <div className="flex flex-row flex-wrap justify-center items-start mx-10">
          {!isAdd && !isEdit && (
            <>
              {profile.Organizations.map((organization) => {
                return (
                  <Fragment key={organization.id}>
                    <div className="basis-1/4 mb-5 flex">
                      <p className="font-bold">
                        {new Date(organization.start_date).toLocaleDateString(
                          'id-ID',
                          { month: 'long', year: 'numeric' }
                        )}
                      </p>
                      <p className="font-bold">
                        {''}-{''}
                      </p>
                      <p className="font-bold">
                        {new Date(organization.end_date).toLocaleDateString(
                          'id-ID',
                          { month: 'long', year: 'numeric' }
                        )}
                      </p>
                    </div>
                    <div className="basis-1/2 mb-5">
                      <p className="font-bold text-lg">
                        {organization.organization}
                      </p>
                      <p className="font-bold text-slate-500">
                        {organization.role}
                      </p>
                      <p className="text-justify">{organization.description}</p>
                    </div>
                    <div className="basis-1/4 mb-5 text-center">
                      {/* edit button */}
                      <button
                        onClick={() => {
                          setIsEdit(true);
                          setCurrentId(organization.id);
                        }}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold p-1 rounded-md ml-2"
                      >
                        <RiEdit2Fill size={15} />
                      </button>
                      {/* end of edit button */}
                      {/* delete button */}
                      <button
                        onClick={() => {
                          setIsDelete(true);
                          handleDelete(organization.id);
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
          {isAdd && !isEdit && (
            <OrganizationForm
              isAdd={isAdd}
              setIsAdd={setIsAdd}
              currentId={currentId}
              setCurrentId={setCurrentId}
            />
          )}
          {isEdit && !isAdd && (
            <OrganizationForm
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              currentId={currentId}
              setCurrentId={setCurrentId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Organization;