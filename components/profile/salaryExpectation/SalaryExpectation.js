import { useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiEdit2Fill } from 'react-icons/ri';
import SalaryExpectationEditForm from './EditForm';

const SalaryExpectation = ({ profile, isEdit, setIsEdit }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full p-4 pt-0">
      <div className="w-full flex font-bold text-white">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="w-full flex items-center justify-between p-2 bg-blue-500 hover:bg-blue-600 pl-6"
        >
          Salary Expectation
          <div>{isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
        </button>
        <button className="w-2/12 flex items-center text-center border-l border-slate-300 bg-blue-500">
          {!isEdit.SalaryExpectation && (
            <div
              className="w-[100%] h-full flex p-2 justify-between items-center text-end bg-blue-500 hover:bg-blue-600"
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
      
      <div className={isOpen ? 'hidden' : 'w-full bg-white py-8'}>
        <div className="flex flex-row flex-wrap justify-center items-center">
          {!isEdit.salary && (
            <>
              <p className="text-lg text-slate-700">
                I expect <span className="text-black font-bold">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(profile.salary_expectation)}</span> per month
              </p>
            </>
          )}
          {isEdit.salary && <SalaryExpectationEditForm isEdit={isEdit} setIsEdit={setIsEdit} />}
        </div>
      </div>
    </div>
  );
};

export default SalaryExpectation;
