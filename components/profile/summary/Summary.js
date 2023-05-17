import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiEdit2Fill } from 'react-icons/ri';
import SummaryEditForm from './EditForm';

const Summary = ({ profile, isEdit, setIsEdit }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full p-4 pt-0">
      <div className="w-full flex  text-white">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="w-full flex items-center justify-between p-2 bg-blue-700 hover:bg-blue-600 pl-6 uppercase text-lg rounded-tl-lg"
        >
          Summary
          <div>{isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
        </button>
        <button className="w-2/12 flex items-center text-center border-l border-slate-300 bg-blue-700">
          {!isEdit.summary && (
            <div
              className="w-[100%] h-full flex p-2 justify-between items-center text-end bg-blue-700 hover:bg-blue-600"
              onClick={() => {
                setIsEdit({ ...isEdit, summary: true });
              }}
            >
              EDIT
              <RiEdit2Fill size={20} />
            </div>
          )}
        </button>
      </div>
      <div className={isOpen ? 'hidden' : 'w-full bg-white py-7 rounded-b-lg'}>
        <div className="grid grid-cols-1 items-center mx-10">
          {!isEdit.summary && (
            <>
              <p className="text-justify text-gray-500">{profile.summary}</p>
            </>
          )}
          {isEdit.summary && <SummaryEditForm isEdit={isEdit} setIsEdit={setIsEdit} />}
        </div>
      </div>
    </div>
  );
};

export default Summary;
