import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const AttainmentsForm = () => {
  const [input, setInput] = useState({
    attainment: "",
  });
  const [attainments, setAttainments] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/attainments`, {
        headers: { authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        setAttainments([...res.data]);
        console.log(attainments)
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
        .post("http://localhost:8000/attainments", input, {
          headers: { authorization: "Bearer " + Cookies.get("token") },
        })
        .then((res) => {
          setIsAdd(false);
          setCurrentId(0);
          setInput({ skill: "" });
          setAttainments([...attainments, res.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .put(`http://localhost:8000/attainments/${currentId}`, input, {
          headers: { authorization: "Bearer " + Cookies.get("token") },
        })
        .then((res) => {
          setIsEdit(false);
          setCurrentId(0);
          setInput({ attainment: "" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleEdit = (id) => {
    setIsEdit(true);
    setCurrentId(id);
    setInput(attainments.find((attainment) => attainment.id === id));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/attainments/${id}`, {
        headers: { authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        setIsDelete(false);
        setAttainments(attainments.filter((attainment) => attainment.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full p-8 mt-10 ">
      <div className="w-1/2 mx-auto p-4">
        <h1 className="text-2xl text-center text-blue-700">Admin CRUD attainments</h1>
        <div className="flex justify-between items-center py-2 bg-slate-300 text-xl">
          <p>Attainment</p>
          <p>Action</p>
        </div>
        {attainments.map((attainment) => (
          <table key={attainment.id} class="w-full table-fixed">
            <tbody>
              <tr className="flex justify-between items-center bg-yellow-50 border-t border-slate-300">
                <td className="">{attainment.attainment}</td>
                <td>
                  <button className="bg-red-300 p-2" onClick={() => handleDelete(attainment.id)}>
                    Delete
                  </button>
                  <button
                    className="bg-yellow-300 p-2"
                    onClick={() => {
                      handleEdit(attainment.id);
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
                name="attainment"
                placeholder="ADD new attainment"
                value={input.attainment}
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
                      attainment: "",
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

export default AttainmentsForm;
