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
          setIsAdd({ ...isAdd, achievement: false });
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
          setIsEdit({ ...isEdit, achievement: false });
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
    <div className="col-span-4 mx-6 py-8">
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="grid items-center mx-auto">
          <label htmlFor="title" className="mr-2 basis-36">
            Title<span className="required text-red-600 text-lg">*</span>
          </label>
          <input type="text" id="title" name="title" value={input.title} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-2 rounded-md" required maxLength={255} />
        </div>
        <div className="grid items-center mx-auto">
          <label htmlFor="issuer" className="mr-2 basis-36">
            Issuer<span className="required text-red-600 text-lg">*</span>
          </label>
          <input type="text" id="issuer" name="issuer" value={input.issuer} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-2 rounded-md" required maxLength={255} />
        </div>
        <div className="grid items-center mx-auto">
          <label htmlFor="date" className="mr-2 basis-36">
            Date<span className="required text-red-600 text-lg">*</span>
          </label>
          <input type="date" id="date" name="date" value={input.date} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-2 rounded-md" required />
        </div>
        <div className="grid items-center mx-auto">
          <label htmlFor="description" className="mr-2 basis-36 self-start">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={input.description}
            onChange={handleChange}
            className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md w-full"
            rows="5"
            maxLength={255}
          />
        </div>
        <div className="flex justify-center text-center space-x-2 pt-4">
          <button
            onClick={() => {
              if (isEdit) {
                setIsEdit({ ...isEdit, achievement: false });
              } else {
                setIsAdd({ ...isAdd, achievement: false });
              }
              setCurrentId(0);
              setInput({
                title: '',
                issuer: '',
                date: '',
                description: '',
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

export default AchievementForm;
