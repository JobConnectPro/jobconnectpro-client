import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const SkillsForm = () => {
  const [input, setInput] = useState({
    skill: "",
  });
  const [skills, setSkills] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/skills`, {
        headers: { authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        setSkills([...res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isAdd, isEdit, isDelete]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentId === 0) {
      axios
        .post("http://localhost:8000/skills", input, {
          headers: { authorization: "Bearer " + Cookies.get("token") },
        })
        .then((res) => {
          setIsAdd(false);
          setCurrentId(0);
          setInput({ skill: "" });
          setSkills([...skills, res.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .put(`http://localhost:8000/skills/${currentId}`, input, {
          headers: { authorization: "Bearer " + Cookies.get("token") },
        })
        .then((res) => {
          setIsEdit(false);
          setCurrentId(0);
          setInput({ skill: "" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleEdit = (id) => {
    setIsEdit(true);
    setCurrentId(id);
    setInput(skills.find((skill) => skill.id === id));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/skills/${id}`, {
        headers: { authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        setIsDelete(false);
        setSkills(skills.filter((skill) => skill.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full p-8 mt-10 ">
      <div className="w-1/2 mx-auto p-4">
        <h1 className="text-2xl text-center text-blue-700">Admin CRUD skills</h1>
        <div className="flex justify-between items-center py-2 bg-slate-300 text-xl">
          <p>Skills</p>
          <p>Action</p>
        </div>
        {skills.map((skill) => (
          <table key={skill.id} class="w-full table-fixed">
            <tbody>
              <tr className="flex justify-between items-center bg-yellow-50 border-t border-slate-300">
                <td className="">{skill.skill}</td>
                <td>
                  <button className="bg-red-300 p-2" onClick={() => handleDelete(skill.id)}>
                    Delete
                  </button>
                  <button
                    className="bg-yellow-300 p-2"
                    onClick={() => {
                      handleEdit(skill.id);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
        <div className="w-full">
          <form onSubmit={handleSubmit} className=" mt-4 mb-8">
            <div className="w-full flex">
              <input
                className="w-full border-2 border-slate-500 rounded-md p-2"
                type="text"
                name="skill"
                placeholder="ADD new skill"
                value={input.skill}
                onChange={handleChange}
              />
              <div className="flex gap-2">
                <button
                  className="bg-slate-400 p-1 hover:bg-slate-300"
                  onClick={() => {
                    if (isEdit) {
                      setIsEdit(false);
                    } else {
                      setIsAdd(false);
                    }
                    setCurrentId(0);
                    setInput({
                      skill: "",
                    });
                  }}
                >
                  Cancel
                </button>
                <button className="bg-blue-500 p-1" type="submit">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
