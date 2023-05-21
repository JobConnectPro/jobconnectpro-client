import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { RiEdit2Fill } from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Loading from '@/components/loading/Loading';

const CategoryForm = () => {
  const [input, setInput] = useState({
    category: '',
  });
  const [category, setCategory] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/categories`, {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setCategory([...res.data]);
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
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
          setIsAdd(false);
          setCurrentId(0);
          setInput({ category: '' });
          setCategory([...category, res.data]);
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
    } else {
      axios
        .put(`http://localhost:8000/categories/${currentId}`, input, {
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
          setIsEdit(false);
          setCurrentId(0);
          setInput({ category: '' });
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
        setIsDelete(false);
        setCategory(category.filter((cat) => cat.id !== id));
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-[22px] h-screen">
      <h1 className="mx-6 mb-4 text-3xl font-bold">Category</h1>
      <div className="mx-6 rounded-md bg-white border border-slate-200">
        <div className="flex justify-between items-center mx-auto py-3 pl-6 bg-blue-700 text-white text-md font-semibold rounded-t-md">
          <p className="border-white">Category</p>
        </div>
        <div className="relative overflow-x-auto mx-6 my-6">
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex items-center flex-wrap justify-center text-sm">
              <input
                className="flex-grow border border-gray-300 rounded-md px-2 py-3 mr-2 mb-4 md:mb-0 lg:mb-0 focus:outline-none focus:border-blue-500"
                type="text"
                name="category"
                placeholder="Category Form"
                value={input.category}
                onChange={handleChange}
                required
              />
              <div className="space-x-2 font-semibold">
                <button
                  className="bg-white py-3 px-4 rounded-md font-semibold text-blue-500 border border-slate-300 hover:border-blue-500"
                  onClick={() => {
                    if (isEdit) {
                      setIsEdit(false);
                    } else {
                      setIsAdd(false);
                    }
                    setCurrentId(0);
                    setInput({
                      category: '',
                    });
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 py-3 px-6 rounded-md font-semibold text-white border border-slate-300 hover:border-blue-700">
                  Save
                </button>
              </div>
            </div>
          </form>
          <table className="w-full divide-y divide-gray-200 border">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-center text-sm text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {category.map((cat) => (
                <>
                  <tr key={cat.id}>
                    <td className="px-6 py-2">{cat.category}</td>
                    <td className="px-6 py-2 text-center">
                      {' '}
                      <button onClick={() => handleDelete(cat.id)} className="mr-2">
                        <FaTrashAlt size={18} className="text-gray-400 hover:text-blue-900" />{' '}
                      </button>
                      <button onClick={() => handleEdit(cat.id)}>
                        <RiEdit2Fill size={18} className="text-blue-700 hover:text-blue-900" />{' '}
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
