import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const ResumeEditForm = ({ isEdit, setIsEdit }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('resume', file);

    axios
      .put('http://localhost:8000/users/resume', formData, {
        headers: { authorization: 'Bearer ' + Cookies.get('token'), 'Content-Type': 'multipart/form-data' },
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
        setIsEdit({ ...isEdit, resume: false });
        setFile(null);
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
          <label htmlFor="resume" className="mr-2 basis-36">
            Resume<span className="required text-red-600 text-lg">*</span>
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
            className="basis-1/2 border border-gray-300 rounded-md py-3 pl-1 pr-3"
            required
            accept=".pdf"
          />
        </div>
        <div>
          <div className="flex justify-center text-center space-x-2 pt-4">
            <button
              onClick={() => {
                setIsEdit({ ...isEdit, resume: false });
              }}
              className="bg-white p-2 px-4 rounded-md font-semibold text-blue-500 border border-slate-300 hover:border-blue-500"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 p-2 px-6 rounded-md font-semibold text-white border border-slate-300 hover:border-blue-700">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResumeEditForm;
