import { useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiEdit2Fill, RiDoorLockLine } from 'react-icons/ri';
import SalaryExpectationEditForm from './EditForm';

const SalaryExpectation = ({ profile, isEdit, setIsEdit }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full p-4 pt-0">
      <div className="w-full flex text-white">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="w-full flex items-center justify-between p-2 bg-blue-700 hover:bg-blue-600 pl-6 uppercase text-lg rounded-tl-lg"
        >
          Salary Expectation
          <div>{isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
        </button>
        <button className="w-2/12 flex items-center text-center border-l border-slate-300 bg-blue-700">
          {!isEdit.salary && (
            <div
              className="w-[100%] h-full flex p-2 justify-between items-center text-end bg-blue-700 hover:bg-blue-600"
              onClick={() => {
                setIsEdit({ ...isEdit, salary: true });
              }}
            >
              EDIT
              <RiEdit2Fill size={20} />
            </div>
          )}
        </button>
      </div>

      <div className={isOpen ? 'hidden' : 'w-full bg-white py-8 rounded-b-lg'}>
        <div className="flex flex-row flex-wrap justify-start items-center mx-6">
          {!isEdit.salary && (
            <>
              <p className="bg-gray-400 text-sm text-white py-2 px-3 rounded-full mr-3">
                <RiDoorLockLine className="inline-block" size={20} /> {profile.privacy}
              </p>
              <p className="text-gray-500">
                {' '}
                I expect <span className="text-black font-bold">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(profile.salary_expectation)}</span> {profile.salary_frequency}
              </p>
            </>
          )}
        </div>
        {isEdit.salary && <SalaryExpectationEditForm isEdit={isEdit} setIsEdit={setIsEdit} />}
      </div>
    </div>
  );
};

export default SalaryExpectation;
