import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const SkillAddForm = ({ isAdd, setIsAdd }) => {
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState({
    skill_id: '',
    level: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:8000/skills', {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setSkills([...res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8000/users/skill', input, {
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
        setIsAdd({ ...isAdd, skill: false });
        setInput({
          skill_id: '',
          level: '',
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
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
    <div className="col-span-4 py-4">
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="grid items-center mx-auto">
          <label htmlFor="skill_id" className="mr-2 basis-36">
            Skill<span className="required text-red-600 text-lg">*</span>
          </label>
          <select id="skill_id" name="skill_id" value={input.skill_id} onChange={handleChange} className="basis-1/2 border border-gray-300 rounded-md py-3 pl-1 pr-3" required>
            <option value="">--Select an option--</option>
            {skills.map((skill) => {
              return (
                <option key={skill.id} value={skill.id}>
                  {skill.skill}
                </option>
              );
            })}
          </select>
        </div>
        <div className="grid items-center mx-auto">
          <label htmlFor="level" className="mr-2 basis-36">
            Level<span className="required text-red-600 text-lg">*</span>
          </label>
          <select id="level" name="level" value={input.level} onChange={handleChange} className="basis-1/2 border border-gray-300 rounded-md py-3 pl-1 pr-3" required>
            <option value="">--Select an option--</option>
            <option value="Basic">Basic</option>
            <option value="Novice">Novice</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        <div>
          <div className="flex justify-center text-center space-x-2 pt-4">
            <button
              onClick={() => {
                setIsAdd({ ...isAdd, skill: false });
                setInput({
                  skill_id: '',
                  level: '',
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
        </div>
      </form>
    </div>
  );
};

export default SkillAddForm;
