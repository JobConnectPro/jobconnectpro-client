import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const SummaryEditForm = ({ isEdit, setIsEdit }) => {
  const [input, setInput] = useState({
    summary: '',
  });

  useEffect(() => {
    if (isEdit) {
      axios
        .get('http://localhost:8000/users/profile', {
          headers: { authorization: 'Bearer ' + Cookies.get('token') },
        })
        .then((res) => {
          setInput({
            summary: res.data.summary,
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
        setIsEdit({ ...isEdit, summary: false });
        setInput({ summary: '' });
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
    <div>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="grid items-center mx-auto">
          <label htmlFor="summary" className="mr-2">
            Summary<span className="required text-red-600 text-lg">*</span>
          </label>
          <textarea id="summary" name="summary" value={input.summary} onChange={handleChange} className="border border-gray-300 px-2 py-1 rounded-md w-full" required maxLength={10000} rows="10" cols="30" />
        </div>
        <div className="flex justify-center text-center space-x-2 pt-4">
          <button
            onClick={() => {
              setIsEdit({ ...isEdit, summary: false });
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

export default SummaryEditForm;
