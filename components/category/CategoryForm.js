import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const CategoryForm = () => {
  const [input, setInput] = useState({
    category: '',
  });
  const [category, setCategory] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/categories`, {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
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
        .post('http://localhost:8000/categories', input, {
          headers: { authorization: 'Bearer ' + Cookies.get('token') },
        })
        .then((res) => {
          setIsAdd(false);
          setCurrentId(0);
          setInput({ category: '' });
          setCategory([...category, res.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .put(`http://localhost:8000/categories/${currentId}`, input, {
          headers: { authorization: 'Bearer ' + Cookies.get('token') },
        })
        .then((res) => {
          setIsEdit(false);
          setCurrentId(0);
          setInput({ category: '' });
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
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
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
    <div className="w-full p-8 mt-10">
  <div className="w-1/2 mx-auto p-4">
    <h1 className="text-3xl text-center text-blue-700 mb-4">
      Admin CRUD Category
    </h1>
    <div className="flex justify-between items-center py-2 bg-gray-200 text-lg font-bold">
      <p>Category</p>
      <p>Action</p>
    </div>
    {category.map((cat) => (
      <div
        key={cat.id}
        className="flex justify-between items-center bg-white border-t border-gray-300 px-4 py-2"
      >
        <p className="text-lg">{cat.category}</p>
        <div className="space-x-2">
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
            onClick={() => handleDelete(cat.id)}
          >
            Delete
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded"
            onClick={() => handleEdit(cat.id)}
          >
            Edit
          </button>
        </div>
      </div>
    ))}
    <form onSubmit={handleSubmit} className="mt-4 mb-8">
      <div className="flex items-center">
        <input
          className="flex-grow border-2 border-gray-300 rounded-md p-2 mr-2 focus:outline-none focus:border-blue-500"
          type="text"
          name="category"
          placeholder="Add new category"
          value={input.category}
          onChange={handleChange}
        />
        <div className="space-x-2">
          <button
            className="bg-gray-400 hover:bg-gray-300 text-white py-1 px-2 rounded"
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
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded" type="submit">
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
