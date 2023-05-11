import { useEffect, useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiEdit2Fill } from 'react-icons/ri';
import ResumeEditForm from './EditForm';
import axios from 'axios';
import Cookies from 'js-cookie';

const Resume = ({ userProfile }) => {
  const [profile, setProfile] = useState({ ...userProfile });
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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
  }, [isEdit]);

  return (
    <div className="w-full p-4 pt-0">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="w-full flex items-center justify-between p-2 bg-blue-500 hover:bg-blue-600"
      >
        Resume
        <div>{isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
      </button>
      <div className={isOpen ? 'hidden' : 'w-full bg-white py-8'}>
        <div className="flex flex-row flex-wrap justify-center items-center">
          {!isEdit && (
            <>
              <p className="text-lg text-slate-700">
                <a href={profile.resume} target="_blank">
                  Resume
                </a>
              </p>
              {/* edit button */}
              <button
                onClick={() => {
                  setIsEdit(true);
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold p-1 rounded-md ml-2"
              >
                <RiEdit2Fill size={15} />
              </button>
              {/* end of edit button */}
            </>
          )}
          {isEdit && <ResumeEditForm isEdit={isEdit} setIsEdit={setIsEdit} />}
        </div>
      </div>
    </div>
  );
};

export default Resume;
