import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const OrganizationForm = ({ isEdit, setIsEdit, currentId, setCurrentId, isAdd, setIsAdd }) => {
  const [input, setInput] = useState({
    organization: '',
    role: '',
    start_date: '',
    end_date: '',
    description: '',
  });

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:8000/organizations/${currentId}`, {
          headers: { authorization: 'Bearer ' + Cookies.get('token') },
        })
        .then((res) => {
          setInput({
            organization: res.data.organization,
            role: res.data.role,
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
      // console.log(input);
      axios
        .post('http://localhost:8000/organizations', input, {
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
          setIsAdd({ ...isAdd, organization: false });
          setCurrentId(0);
          setInput({
            organization: '',
            role: '',
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
        .put(`http://localhost:8000/organizations/${currentId}`, input, {
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
          setIsEdit({ ...isEdit, organization: false });
          setCurrentId(0);
          setInput({
            title: '',
            issuer: '',
            date: '',
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
          <label htmlFor="organization" className="mr-2 basis-36">
            Organization:
          </label>
          <input type="text" id="organization" name="organization" value={input.organization} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
        </div>
        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="role" className="mr-2 basis-36">
            Role:
          </label>
          <input type="text" id="role" name="role" value={input.role} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
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
                  setIsEdit({ ...isEdit, organization: false });
                } else {
                  setIsAdd({ ...isAdd, organization: false });
                }
                setCurrentId(0);
                setInput({
                  organization: '',
                  role: '',
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

export default OrganizationForm;
