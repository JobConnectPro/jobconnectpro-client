import { useState, useEffect } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import axios from "axios";
import format from "date-fns/format";

export default function WorkExperience() {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  // toggle untuk membuka dan menutup data work-experience
  const toggle = () => {
    setIsOpen(!isOpen);
    setOpen(false);
  };

  // toggle untuk membuka dan menutup add
  const addToggle = () => {
    setOpen(!open);
    setIsOpen(false);
  };

  const cancelButton = () => {
    setOpen(false);
  };

  const [workExperience, setWorkExperience] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    user_id: "",
    job_title: "",
    company: "",
    start_date: "",
    end_date: "",
    description: "",
    job_level: "",
    salary: "",
    salary_frequency: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8000/work_experience");
      setWorkExperience(response.data);
    }
    setTimeout(() => {
      fetchData();
    }, 500);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await axios.put(`http://localhost:8000/work_experience/${formData.id}`, formData);
        const updatedData = workExperience.map((item) => (item.id === formData.id ? formData : item));
        setWorkExperience(updatedData);
      } else {
        const response = await axios.post("http://localhost:8000/work_experience", formData);
        setWorkExperience((prevData) => [...prevData, response.data]);
        const fetchData = async () => {
          const response = await axios.get("http://localhost:8000/work_experience");
          setWorkExperience(response.data);
        };
        setTimeout(() => {
          fetchData();
        }, 300);
      }
      setFormData({
        id: null,
        user_id: "",
        job_title: "",
        company: "",
        start_date: "",
        end_date: "",
        description: "",
        job_level: "",
        salary: "",
        salary_frequency: "",
      });

      setOpen(false);
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    const response = await axios.get(`http://localhost:8000/work_experience/${id}`);
    setFormData(response.data);
    setOpen(true);
    setIsOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/work_experience/${id}`);
      const deletedData = workExperience.filter((item) => item.id !== id);
      setWorkExperience(deletedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full p-4 pt-0 pl-52">
      <div className="w-full flex font-bold text-white">
        <button
          onClick={toggle}
          className="w-[80%] flex items-center justify-between p-2 bg-blue-500 hover:bg-blue-600 "
        >
          Work Experience
          <div>{!isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
        </button>
        <button
          onClick={addToggle}
          className="w-[20%] flex items-center justify-between p-2 border-l border-slate-300 bg-blue-500 hover:bg-blue-600"
        >
          ADD
          <div>{!open ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
        </button>
      </div>

      <div className={isOpen ? "" : "hidden"}>
        <div className="w-full bg-slate-200 ">
          <table className="table-auto w-full">
            <tbody className="">
              {workExperience.map((item) => (
                <tr key={item.id} className="border-t border-blue-300 font-semibold hover:bg-slate-100">
                  <td className="px-2 py-6">
                    {/* {format(new Date(item.start_date), "MMMM yyyy")} - {format(new Date(item.end_date), "MMMM yyyy")} */}
                    {item.start_date} - {item.end_date}
                  </td>
                  <td className="">
                    {item.job_title} at {item.company}
                  </td>
                  <td className="text-right px-2">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="mx-4 bg-white p-2 px-4 rounded-md font-semibold text-blue-500 border border-slate-300 hover:border-blue-500"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        handleEdit(item.id);
                      }}
                      className=" bg-blue-500 p-2 px-6 rounded-md font-semibold text-white border border-slate-300 hover:border-blue-700"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={open ? "" : "hidden"}>
        <h1 className="text-center text-6xl bg-slate-100 p-20 text-red-300">ADD/EDIT work-experience</h1>
        <form onSubmit={handleFormSubmit}>
          <label className="block font-semibold text-xl mb-2">User ID</label>
          <input
            className="block w-full border rounded-md p-2 mb-4"
            type="number"
            name="user_id"
            value={formData.user_id}
            onChange={handleInputChange}
          />

          <label className="block font-semibold text-xl mb-2">Job Title</label>
          <input
            className="block w-full border rounded-md p-2 mb-4"
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleInputChange}
          />

          <label className="block font-semibold text-xl mb-2">Company</label>
          <input
            className="block w-full border rounded-md p-2 mb-4"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
          />

          <label className="block font-semibold text-xl mb-2">Start Date</label>
          <input
            className="block w-full border rounded-md p-2 mb-4"
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleInputChange}
          />

          <label className="block font-semibold text-xl mb-2">End Date</label>
          <input
            className="block w-full border rounded-md p-2 mb-4"
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange}
          />

          <label className="block font-semibold text-xl mb-2">Description</label>
          <input
            className="block w-full border rounded-md p-2 mb-4"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />

          <label className="block font-semibold text-xl mb-2">Job Level</label>
          <input
            className="block w-full border rounded-md p-2 mb-4"
            type="text"
            name="job_level"
            value={formData.job_level}
            onChange={handleInputChange}
          />

          <label className="block font-semibold text-xl mb-2">Salary</label>
          <input
            className="block w-full border rounded-md p-2 mb-4"
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
          />

          <label className="block font-semibold text-xl mb-2">Salary Frequency</label>
          <input
            className="block w-full border rounded-md p-2 mb-4"
            type="text"
            name="salary_frequency"
            value={formData.salary_frequency}
            onChange={handleInputChange}
          />

          <div className="flex justify-end">
            <button
              onClick={cancelButton}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleFormSubmit}
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 ml-4 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
