import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiEdit2Fill } from 'react-icons/ri';
import SummaryEditForm from './EditForm';

const Summary = ({ profile, isEdit, setIsEdit }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full p-4 pt-0">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="w-full flex items-center justify-between p-2 bg-blue-500 hover:bg-blue-600"
      >
        Summary
        <div>{isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
      </button>
      <div className={isOpen ? 'hidden' : 'w-full bg-white py-8'}>
        <div className="flex flex-row flex-wrap justify-center items-center mx-10">
          {!isEdit.summary && (
            <>
              <p className="text-justify">{profile.summary}</p>
              {/* edit button */}
              <button
                onClick={() => {
                  setIsEdit({ ...isEdit, summary: true });
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold p-1 rounded-md ml-2"
              >
                <RiEdit2Fill size={15} />
              </button>
              {/* end of edit button */}
            </>
          )}
          {isEdit.summary && <SummaryEditForm isEdit={isEdit} setIsEdit={setIsEdit} />}
        </div>
      </div>
    </div>
  );
};

export default Summary;
