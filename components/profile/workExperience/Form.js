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
    <div className="w-full text-end">
      <form className="space-y-2 p-4" onSubmit={handleSubmit}>
        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="project_name" className="mr-2 text-start basis-36">
            Job Title:
          </label>
          <input type="text" id="job_title" name="job_title" value={input.job_title} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
        </div>
        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="role" className="mr-2 text-start basis-36">
            Company:
          </label>
          <input type="text" id="company" name="company" value={input.company} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
        </div>
        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="start_date" className="mr-2 text-start basis-36">
            Start Date:
          </label>
          <input type="date" id="start_date" name="start_date" value={input.start_date} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
        </div>
        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="end_date" className="mr-2 text-start basis-36">
            End Date:
          </label>
          <input type="date" id="end_date" name="end_date" value={input.end_date} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
        </div>
        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="description" className="mr-2 text-start basis-36 self-start">
            Description:
          </label>
          <textarea id="description" name="description" value={input.description} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md w-full" required rows="5" />
        </div>
        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="role" className="mr-2 text-start basis-36">
            Job Level:
          </label>
          <input type="text" id="job_level" name="job_level" value={input.job_level} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
        </div>
        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="role" className="mr-2 text-start basis-36">
            Salary:
          </label>
          <input type="number" id="salary" name="salary" value={input.salary} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
        </div>
        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="role" className="mr-2 text-start basis-36">
            Salary Freuency:
          </label>
          <input
            type="text"
            id="salary_frequency"
            name="salary_frequency"
            value={input.salary_frequency}
            onChange={handleChange}
            className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md"
            required
          />
        </div>
        <div>
          <div className="flex justify-center text-center gap-4">
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
              className="my-4 bg-white p-2 px-4 rounded-md font-semibold text-blue-500 border border-slate-300 hover:border-blue-500"
            >
              Cancel
            </button>
            <button type="submit" className="my-4 bg-blue-500 p-2 px-4 rounded-md font-semibold text-white border border-slate-300 hover:border-blue-700">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WorkExperienceForm;
