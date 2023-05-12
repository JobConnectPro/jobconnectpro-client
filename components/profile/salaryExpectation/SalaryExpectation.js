import { useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiEdit2Fill } from 'react-icons/ri';
import SalaryExpectationEditForm from './EditForm';

const SalaryExpectation = ({ profile, isEdit, setIsEdit }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full p-4 pt-0">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="w-full flex items-center justify-between p-2 bg-blue-500 hover:bg-blue-600"
      >
        Salary Expectation
        <div>{isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
      </button>
      <div className={isOpen ? 'hidden' : 'w-full bg-white py-8'}>
        <div className="flex flex-row flex-wrap justify-center items-center">
          {!isEdit.salary && (
            <>
              <p className="text-lg text-slate-700">
                I expect <span className="text-black font-bold">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(profile.salary_expectation)}</span> per month
              </p>
              {/* edit button */}
              <button
                onClick={() => {
                  setIsEdit({ ...isEdit, salary: true });
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold p-1 rounded-md ml-2"
              >
                <RiEdit2Fill size={15} />
              </button>
              {/* end of edit button */}
            </>
          )}
          {isEdit.salary && <SalaryExpectationEditForm isEdit={isEdit} setIsEdit={setIsEdit} />}
        </div>
      </div>
    </div>
  );
};

export default SalaryExpectation;
