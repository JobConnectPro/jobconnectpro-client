import { Fragment, useState } from 'react';
import { RiArrowDropDownLine, RiAddLine, RiArrowDropUpLine, RiEdit2Fill, RiAddCircleLine } from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';

import axios from 'axios';
import Cookies from 'js-cookie';
import EducationForm from './EducationForm';
import { toast } from 'react-toastify';

const Education = ({ profile, isAdd, setIsAdd, isEdit, setIsEdit, isDelete, setIsDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const handleDelete = (educationId) => {
    axios
      .delete(`http://localhost:8000/educations/${educationId}`, {
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
        setIsDelete({ ...isDelete, education: false });
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
          Education
          <div>{isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
        </button>
        <button className="w-2/12 flex items-center text-center border-l border-slate-300 bg-blue-500">
          {!isAdd.education && !isEdit.education && (
            <div
              className="w-[100%] h-full flex p-2 justify-between items-center text-end bg-blue-500 hover:bg-blue-600"
              onClick={() => {
                setIsAdd({ ...isAdd, education: true });
              }}
            >
              ADD
              <RiAddLine size={25} />
            </div>
          )}
        </button>
      </div>

      <div className={isOpen ? 'hidden' : 'w-full bg-white py-4'}>
        <div className="flex flex-row flex-wrap justify-center items-start mx-10 pt-4">
          {!isAdd.education && !isEdit.education && (
            <>
              {profile.Education.map((education) => {
                return (
                  <Fragment key={education.id}>
                    <div className="basis-1/4 mb-5 flex">
                      <p className="font-bold">{new Date(education.start_date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</p>
                      <p className="font-bold">
                        {''} - {''}
                      </p>
                      <p className="font-bold">{new Date(education.end_date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className="basis-1/2 mb-5">
                      <p className="font-bold text-lg">{education.school}</p>
                      <p className="font-bold text-slate-500">{education.Attainment.attainment}</p>
                      <p className="text-justify">{education.major}</p>
                    </div>
                    <div className="basis-1/4 mb-5 text-center">
                      {/* edit button */}
                      <button
                        onClick={() => {
                          setIsEdit({ ...isEdit, education: true });
                          setCurrentId(education.id);
                        }}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold p-1 rounded-md ml-2"
                      >
                        <RiEdit2Fill size={15} />
                      </button>
                      {/* end of edit button */}
                      {/* delete button */}
                      <button
                        onClick={() => {
                          setIsDelete({ ...isDelete, education: true });
                          handleDelete(education.id);
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
          {isAdd.education && !isEdit.education && <EducationForm isAdd={isAdd} setIsAdd={setIsAdd} currentId={currentId} setCurrentId={setCurrentId} />}
          {isEdit.education && !isAdd.education && <EducationForm isEdit={isEdit} setIsEdit={setIsEdit} currentId={currentId} setCurrentId={setCurrentId} />}
        </div>
      </div>
    </div>
  );
};

export default Education;
