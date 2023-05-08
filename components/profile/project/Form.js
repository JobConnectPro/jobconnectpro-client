import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const ProjectForm = ({ isEdit, setIsEdit, currentId, setCurrentId, isAdd, setIsAdd }) => {
  const [input, setInput] = useState({
    project_name: '',
    role: '',
    link: '',
    start_date: '',
    end_date: '',
    description: '',
  });

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:8000/projects/${currentId}`, {
          headers: { authorization: 'Bearer ' + Cookies.get('token') },
        })
        .then((res) => {
          setInput({
            project_name: res.data.project_name,
            role: res.data.role,
            link: res.data.link,
            start_date: new Date(res.data.start_date).toISOString().split('T')[0],
            end_date: new Date(res.data.end_date).toISOString().split('T')[0],
            description: res.data.description,
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
        .post('http://localhost:8000/projects', input, {
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
          setIsAdd(false);
          setCurrentId(0);
          setInput({
            project_name: '',
            role: '',
            link: '',
            start_date: '',
            end_date: '',
            description: '',
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
        .put(`http://localhost:8000/projects/${currentId}`, input, {
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
          setIsEdit(false);
          setCurrentId(0);
          setInput({
            project_name: '',
            role: '',
            link: '',
            start_date: '',
            end_date: '',
            description: '',
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
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="project_name" className="mr-2 basis-36">
            Project Name:
          </label>
          <input type="text" id="project_name" name="project_name" value={input.project_name} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
        </div>
        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="role" className="mr-2 basis-36">
            Role:
          </label>
          <input type="text" id="role" name="role" value={input.role} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
        </div>
        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="link" className="mr-2 basis-36">
            Link:
          </label>
          <input type="text" id="link" name="link" value={input.link} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
        </div>
        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="start_date" className="mr-2 basis-36">
            Start Date:
          </label>
          <input type="date" id="start_date" name="start_date" value={input.start_date} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
        </div>
        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="end_date" className="mr-2 basis-36">
            End Date:
          </label>
          <input type="date" id="end_date" name="end_date" value={input.end_date} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
        </div>
        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="description" className="mr-2 basis-36 self-start">
            Description:
          </label>
          <textarea id="description" name="description" value={input.description} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md w-full" required rows="5" />
        </div>
        <div>
          <div className="flex justify-center text-center gap-4">
            <button
              onClick={() => {
                if (isEdit) {
                  setIsEdit(false);
                } else {
                  setIsAdd(false);
                }
                setCurrentId(0);
                setInput({
                  project_name: '',
                  role: '',
                  link: '',
                  start_date: '',
                  end_date: '',
                  description: '',
                });
              }}
              className="my-4 bg-white p-2 px-4 rounded-md font-semibold text-blue-500 border border-slate-300 hover:border-blue-500"
            >
              Cancel
            </button>
            <button type="submit" className="my-4 bg-blue-500 p-2 px-6 rounded-md font-semibold text-white border border-slate-300 hover:border-blue-700">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
