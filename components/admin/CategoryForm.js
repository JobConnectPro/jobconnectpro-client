import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const CategoryForm = () => {
  const [input, setInput] = useState({
    category: "",
  });
  const [category, setCategory] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/categories`, {
        headers: { authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        setCategory([...res.data]);
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
        .post("http://localhost:8000/categories", input, {
          headers: { authorization: "Bearer " + Cookies.get("token") },
        })
        .then((res) => {
          setIsAdd(false);
          setCurrentId(0);
          setInput({ category: "" });
          setCategory([...category, res.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .put(`http://localhost:8000/categories/${currentId}`, input, {
          headers: { authorization: "Bearer " + Cookies.get("token") },
        })
        .then((res) => {
          setIsEdit(false);
          setCurrentId(0);
          setInput({ category: "" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleEdit = (id) => {
    setIsEdit(true);
    setCurrentId(id);
    setInput(category.find((cat) => cat.id === id));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/categories/${id}`, {
        headers: { authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        setIsDelete(false);
        setCategory(category.filter((cat) => cat.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full p-4">
      <h1 className="lg:w-1/2 md:w-2/3 sm:w-full mb-4 text-lg mx-auto text-center text-blue-700 p-1 border-2 border-blue-500 rounded-md">
        All Data Categories
      </h1>
      <div className="lg:w-1/2 md:w-2/3 sm:w-full mx-auto pb-4 rounded-md bg-white shadow-xl">
        <div className="flex justify-between items-center mx-auto py-2 px-2 bg-blue-500 text-white text-md font-semibold rounded-t-md">
          <p className="w-2/3 border-r border-white">Category</p>
          <p>Action</p>
        </div>
        {category.map((cat) => (
          <div
            key={cat.id}
            className="flex justify-between items-center text-sm bg-white border-b border-gray-300 mx-2 py-2 hover:bg-blue-50"
          >
            <p className="w-2/3">{cat.category}</p>
            <div className="space-x-2 font-semibold ">
              <button
                className="text-slate-500 border border-red-300 hover:bg-red-400 w-14 hover:text-white py-1 rounded"
                onClick={() => handleDelete(cat.id)}
              >
                Delete
              </button>
              <button
                className="text-slate-500 border border-yellow-300 hover:bg-yellow-400 w-14 hover:text-white py-1 rounded"
                onClick={() => handleEdit(cat.id)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
        <form onSubmit={handleSubmit} className="mt-4 px-2">
          <div className="flex items-center text-sm">
            <input
              className="flex-grow border-2 border-gray-300 rounded-md p-2 mr-2 focus:outline-none focus:border-blue-500"
              type="text"
              name="category"
              placeholder="Add new category"
              value={input.category}
              onChange={handleChange}
            />
            <div className="space-x-2 p-0 font-semibold">
              <button
                className="bg-gray-400 w-14 hover:bg-gray-500 text-white py-1 rounded"
                onClick={() => {
                  if (isEdit) {
                    setIsEdit(false);
                  } else {
                    setIsAdd(false);
                  }
                  setCurrentId(0);
                  setInput({
                    category: "",
                  });
                }}
              >
                Cancel
              </button>
              <button className="w-14 bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
