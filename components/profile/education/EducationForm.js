import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const EducationForm = ({ isEdit, setIsEdit, currentId, setCurrentId, isAdd, setIsAdd }) => {
  const [input, setInput] = useState({
    attainment_id: '',
    school: '',
    major: '',
    description: '',
    start_date: '',
    end_date: '',
  });

  const [attainments, setAttainments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/attainments`, {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setAttainments([...res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:8000/educations/${currentId}`, {
          headers: { authorization: 'Bearer ' + Cookies.get('token') },
        })
        .then((res) => {
          setInput({
            attainment_id: res.data.attainment_id,
            school: res.data.school,
            major: res.data.major,
            description: res.data.description,
            start_date: new Date(res.data.start_date).toISOString().split('T')[0],
            end_date: new Date(res.data.end_date).toISOString().split('T')[0],
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
        .post('http://localhost:8000/educations', input, {
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
          setIsAdd({ ...isAdd, education: false });
          setCurrentId(0);
          setInput({
            attainment_id: '',
            school: '',
            major: '',
            description: '',
            start_date: '',
            end_date: '',
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
        .put(`http://localhost:8000/educations/${currentId}`, input, {
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
          setIsEdit({ ...isEdit, education: false });
          setCurrentId(0);
          setInput({
            attainment_id: '',
            school: '',
            major: '',
            description: '',
            start_date: '',
            end_date: '',
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
          <label htmlFor="school" className="mr-2 basis-36">
            Insitute/University:
          </label>
          <input type="text" id="school" name="school" value={input.school} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
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
          <label htmlFor="role" className="mr-2 basis-36">
            Qualification:
          </label>
          <select id="attainment_id" name="attainment_id" value={input.attainment_id} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md">
            <option value="">--Select an Option--</option>
            {attainments.map((attainment) => {
              return <option value={attainment.id}>{attainment.attainment}</option>;
            })}
          </select>
        </div>
        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="major" className="mr-2 basis-36">
            Major:
          </label>
          <input type="text" id="major" name="major" value={input.major} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
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
                  setIsEdit({ ...isEdit, education: false });
                } else {
                  setIsAdd({ ...isAdd, education: false });
                }
                setCurrentId(0);
                setInput({
                  attainment_id: '',
                  school: '',
                  major: '',
                  description: '',
                  start_date: '',
                  end_date: '',
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

export default EducationForm;
