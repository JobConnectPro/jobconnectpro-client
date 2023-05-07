import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const AchievementForm = ({ isEdit, setIsEdit, currentId, setCurrentId, isAdd, setIsAdd }) => {
  const [input, setInput] = useState({
    title: '',
    issuer: '',
    date: '',
    description: '',
  });

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:8000/achievements/${currentId}`, {
          headers: { authorization: 'Bearer ' + Cookies.get('token') },
        })
        .then((res) => {
          setInput({
            title: res.data.title,
            issuer: res.data.issuer,
            date: new Date(res.data.date).toISOString().split('T')[0],
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
        .post('http://localhost:8000/achievements', input, {
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
    } else {
      axios
        .put(`http://localhost:8000/achievements/${currentId}`, input, {
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
          <label htmlFor="title" className="mr-2 basis-36">
            Title:
          </label>
          <input type="text" id="title" name="title" value={input.title} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
        </div>
        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="issuer" className="mr-2 basis-36">
            Issuer:
          </label>
          <input type="text" id="issuer" name="issuer" value={input.issuer} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
        </div>
        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="date" className="mr-2 basis-36">
            Date:
          </label>
          <input type="date" id="date" name="date" value={input.date} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
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
                  title: '',
                  issuer: '',
                  date: '',
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

export default AchievementForm;
