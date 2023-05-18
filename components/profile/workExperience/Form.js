import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const WorkExperienceForm = ({ isEdit, setIsEdit, currentId, setCurrentId, isAdd, setIsAdd }) => {
  const [input, setInput] = useState({
    job_title: '',
    company: '',
    start_date: '',
    end_date: '',
    description: '',
    job_level: '',
    salary: '',
    salary_frequency: '',
  });

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:8000/work-experiences/${currentId}`, {
          headers: { authorization: 'Bearer ' + Cookies.get('token') },
        })
        .then((res) => {
          setInput({
            job_title: res.data.job_title,
            company: res.data.company,
            start_date: new Date(res.data.start_date).toISOString().split('T')[0],
            end_date: new Date(res.data.end_date).toISOString().split('T')[0],
            description: res.data.description,
            job_level: res.data.job_level,
            salary: res.data.salary,
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
    if (currentId === 0) {
      axios
        .post('http://localhost:8000/work-experiences', input, {
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
          setIsAdd({ ...isAdd, workExperience: false });
          setCurrentId(0);
          setInput({
            job_title: '',
            company: '',
            start_date: '',
            end_date: '',
            description: '',
            job_level: '',
            salary: '',
            salary_frequency: '',
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
    } else {
      axios
        .put(`http://localhost:8000/work-experiences/${currentId}`, input, {
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
          setIsEdit({ ...isEdit, workExperience: false });
          setCurrentId(0);
          setInput({
            job_title: '',
            company: '',
            start_date: '',
            end_date: '',
            description: '',
            job_level: '',
            salary: '',
            salary_frequency: '',
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
  };

  return (
    <div className="col-span-4 mx-6 py-8">
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="grid items-center mx-auto">
          <label htmlFor="project_name" className="mr-2 basis-36">
            Job Title<span className="required text-red-600 text-lg">*</span>
          </label>
          <input
            type="text"
            id="job_title"
            name="job_title"
            value={input.job_title}
            onChange={handleChange}
            className="basis-1/2 border border-gray-300 px-2 py-2 rounded-md"
            required
            maxLength={255}
          />
        </div>
        <div className="grid items-center mx-auto">
          <label htmlFor="role" className="mr-2 basis-36">
            Company<span className="required text-red-600 text-lg">*</span>
          </label>
          <input type="text" id="company" name="company" value={input.company} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-2 rounded-md" required maxLength={255} />
        </div>
        <div className="grid items-center mx-auto">
          <label htmlFor="start_date" className="mr-2 basis-36">
            Start Date<span className="required text-red-600 text-lg">*</span>
          </label>
          <input type="date" id="start_date" name="start_date" value={input.start_date} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-2 rounded-md" required />
        </div>
        <div className="grid items-center mx-auto">
          <label htmlFor="end_date" className="mr-2 basis-36">
            End Date<span className="required text-red-600 text-lg">*</span>
          </label>
          <input type="date" id="end_date" name="end_date" value={input.end_date} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-2 rounded-md" required />
        </div>
        <div className="grid items-center mx-auto">
          <label htmlFor="description" className="mr-2 basis-36 self-start">
            Description
          </label>
          <textarea id="description" name="description" value={input.description} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md w-full" rows="5" maxLength={255} />
        </div>
        <div className="grid items-center mx-auto">
          <label htmlFor="role" className="mr-2 basis-36">
            Job Level<span className="required text-red-600 text-lg">*</span>
          </label>
          <select id="job_level" name="job_level" value={input.job_level} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-2 rounded-md" required>
            <option value="">-- Select Type --</option>
            <option value="Internship/Ojt">Internship/Ojt</option>
            <option value="Entry-Level/Junior">Entry-Level/Junior</option>
            <option value="Associate/Supervisor">Associate/Supervisor</option>
            <option value="Associate/Supervisor">Mid-Senior-Level/Manager</option>
            <option value="Associate/Supervisor">Director/Executive</option>
          </select>
        </div>
        <div className="grid items-center mx-auto">
          <label htmlFor="role" className="mr-2 basis-36">
            Salary<span className="required text-red-600 text-lg">*</span>
          </label>
          <input type="number" id="salary" name="salary" value={input.salary} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-2 rounded-md" required />
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
              if (isEdit) {
                setIsEdit({ ...isEdit, workExperience: false });
              } else {
                setIsAdd({ ...isAdd, workExperience: false });
              }
              setCurrentId(0);
              setInput({
                job_title: '',
                company: '',
                start_date: '',
                end_date: '',
                description: '',
                job_level: '',
                salary: '',
                salary_frequency: '',
              });
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

export default WorkExperienceForm;
