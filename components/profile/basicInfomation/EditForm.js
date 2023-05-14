import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const BasicInformationEditForm = ({ isEdit, setIsEdit }) => {
  const [input, setInput] = useState({
    name: '',
    birthday: '',
    gender: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (isEdit) {
      axios
        .get('http://localhost:8000/users/profile', {
          headers: { authorization: 'Bearer ' + Cookies.get('token') },
        })
        .then((res) => {
          setInput({
            name: res.data.name,
            birthday: new Date(res.data.birthday).toISOString().split('T')[0],
            gender: res.data.gender,
            phone: res.data.phone,
            address: res.data.address,
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
        setIsEdit({ ...isEdit, basicInformation: false });
        setInput({ name: '', birthday: '', gender: '', phone: '', address: '' });
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
    <div className="w-full text-end">
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="name" className="mr-2 basis-36">
            Name:
          </label>
          <input type="text" id="name" name="name" value={input.name} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
        </div>

        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="birthday" className="mr-2 basis-36">
            Birthday:
          </label>
          <input type="date" id="birthday" value={input.birthday} onChange={handleChange} name="birthday" className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
        </div>

        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="gender" className="mr-2 basis-36">
            Gender:
          </label>
          <select id="gender" name="gender" value={input.gender} onChange={handleChange} className="basis-1/2 border border-gray-300 rounded-md py-2 pl-1 pr-3" required>
            <option value="">--Select an option--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="phone" className="mr-2 basis-36">
            Mobile Number:
          </label>
          <input type="text" id="phone" name="phone" value={input.phone} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
        </div>

        <div className="flex items-center mx-auto justify-center">
          <label htmlFor="address" className="mr-2 basis-36">
            Address:
          </label>
          <input type="text" id="address" name="address" value={input.address} onChange={handleChange} className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md" required />
        </div>
        <div>
          <div className="flex justify-center text-center gap-4">
            <button
              onClick={() => {
                setIsEdit({ ...isEdit, basicInformation: false });
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

export default BasicInformationEditForm;
