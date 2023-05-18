import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const SalaryExpectationEditForm = ({ isEdit, setIsEdit }) => {
  const [input, setInput] = useState({
    privacy: '',
    salary_expectation: '',
    salary_frequency: '',
  });

  useEffect(() => {
    if (isEdit) {
      axios
        .get('http://localhost:8000/users/profile', {
          headers: { authorization: 'Bearer ' + Cookies.get('token') },
        })
        .then((res) => {
          setInput({
            privacy: res.data.privacy,
            salary_expectation: res.data.salary_expectation,
            salary_frequency: res.data.salary_frequency,
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error(error, {
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
    }
  }, [isEdit]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put('http://localhost:8000/users/profile', input, {
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
        setIsEdit({ ...isEdit, salary: false });
        setInput({ salary_expectation: '' });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error, {
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
    <div className="mx-6">
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="grid items-center mx-auto">
          <label htmlFor="privacy" className="mr-2 basis-36">
            Privacy<span className="required text-red-600 text-lg">*</span>
          </label>
          <select id="privacy" name="privacy" value={input.privacy} onChange={handleChange} className="basis-1/2 border border-gray-300 rounded-md py-3 pl-1 pr-3" required>
            <option value="">--Select an option--</option>
            <option value="Only Me">Only Me</option>
            <option value="Public">Public</option>
          </select>
        </div>
        <div className="grid items-center mx-auto">
          <label htmlFor="salary_expectation" className="mr-2 basis-36">
            Salary Expectation<span className="required text-red-600 text-lg">*</span>
          </label>
          <input
            type="number"
            id="salary_expectation"
            name="salary_expectation"
            value={input.salary_expectation}
            onChange={handleChange}
            className="basis-1/2 border border-gray-300 px-2 py-2 rounded-md"
            required
          />
        </div>
        <div className="grid items-center mx-auto">
          <label htmlFor="salary_frequency" className="mr-2 basis-36">
            Salary Frequency<span className="required text-red-600 text-lg">*</span>
          </label>
          <select id="salary_frequency" name="salary_frequency" value={input.salary_frequency} onChange={handleChange} className="basis-1/2 border border-gray-300 rounded-md py-3 pl-1 pr-3" required>
            <option value="">--Select an option--</option>
            <option value="per year">per year</option>
            <option value="per month">per month</option>
            <option value="per day">per day</option>
            <option value="per hour">per hour</option>
          </select>
        </div>
        <div className="flex justify-center text-center space-x-2 pt-4">
          <button
            onClick={() => {
              setIsEdit({ ...isEdit, salary: false });
            }}
            className="bg-white p-2 px-4 rounded-md font-semibold text-blue-500 border border-slate-300 hover:border-blue-500"
          >
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 p-2 px-6 rounded-md font-semibold text-white border border-slate-300 hover:border-blue-700">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SalaryExpectationEditForm;
