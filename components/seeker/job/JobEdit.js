import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { getCategoryList } from '@/modules/fetch';

const JobEdit = ({ job }) => {
  const router = useRouter();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [formData, setFormData] = useState({
    title: job.title,
    location: job.location,
    description: job.description,
    requirement: job.requirement,
    job_level: job.job_level,
    type: job.type,
    categoryIds: [],
    minimum_salary: job.minimum_salary,
    maximum_salary: job.maximum_salary,
    starting_date: job.starting_date,
    minimum_experience: job.minimum_experience,
    status: job.status,
  });


  const fetchCategories = async () => {
    try {
      const categories = await getCategoryList();
      setCategoryOptions(categories);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(categoryOptions)

  useEffect(() => {
    fetchCategories();
  }, []);

  // Rest of the code...

  const handleCategorySelect = (e) => {
    const { options } = e.target;
    const selectedCategories = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedCategories.push(options[i].value);
      }
    }
    setFormData((prevState) => ({
      ...prevState,
      categoryIds: selectedCategories,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(job.id);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { id } = job;
      const response = await fetch(`http://localhost:8000/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify(formData),
      });
      console.log(response.body)
      const data = await response.json();
      if (response.ok) {
        toast.success(`${data.message}`, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        router.push('/jobs');
        console.log(data);
      } else {
        toast.error(`${data.message}`, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      //   console.log(`Ini Error Dari Edit : ${error}`);
      toast.error(`${error.message}`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <form onSubmit={handleEditSubmit}>
      <div className='mb-4 my-10'>
        <label className='block text-gray-700 font-semibold mb-2'>Title</label>
        <input
          className='w-full px-4 py-2 border rounded-md'
          type='text'
          name='title'
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-semibold mb-2'>
          Location
        </label>
        <input
          className='w-full px-4 py-2 border rounded-md'
          type='text'
          name='location'
          value={formData.location}
          onChange={handleInputChange}
        />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-semibold mb-2'>
          Description
        </label>
        <textarea
          className='w-full px-4 py-2 border rounded-md'
          name='description'
          value={formData.description}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-semibold mb-2'>
          Categories
        </label>
        <select
          className='w-full px-4 py-2 border rounded-md'
          name='categoryIds'
          value={formData.categoryIds}
          onChange={handleCategorySelect}
          multiple
        >
          {categoryOptions.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category}
            </option>
          ))}
        </select>
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-semibold mb-2'>
          Requirement
        </label>
        <textarea
          className='w-full px-4 py-2 border rounded-md'
          name='requirement'
          value={formData.requirement}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-semibold mb-2'>
          Job Level
        </label>
        <input
          className='w-full px-4 py-2 border rounded-md'
          type='text'
          name='job_level'
          value={formData.job_level}
          onChange={handleInputChange}
        />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-semibold mb-2'>Type</label>
        <input
          className='w-full px-4 py-2 border rounded-md'
          type='text'
          name='type'
          value={formData.type}
          onChange={handleInputChange}
        />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-semibold mb-2'>
          Minimum Salary
        </label>
        <input
          className='w-full px-4 py-2 border rounded-md'
          type='number'
          name='minimum_salary'
          value={formData.minimum_salary}
          onChange={handleInputChange}
        />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-semibold mb-2'>
          Maximum Salary
        </label>
        <input
          className='w-full px-4 py-2 border rounded-md'
          type='number'
          name='maximum_salary'
          value={formData.maximum_salary}
          onChange={handleInputChange}
        />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-semibold mb-2'>
          Starting Date
        </label>
        <input
          className='w-full px-4 py-2 border rounded-md'
          type='date'
          name='starting_date'
          value={formData.starting_date}
          onChange={handleInputChange}
        />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-semibold mb-2'>
          Minimum Experience
        </label>
        <input
          className='w-full px-4 py-2 border rounded-md'
          type='number'
          name='minimum_experience'
          value={formData.minimum_experience}
          onChange={handleInputChange}
        />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-semibold mb-2'>Status</label>
        <select
          className='w-full px-4 py-2 border rounded-md'
          name='status'
          value={formData.status}
          onChange={handleInputChange}
        >
          <option value='1'>Open</option>
          <option value='0'>Closed</option>
        </select>
      </div>

      <div className='flex justify-end'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
          type='button'
          onClick={handleEditSubmit}
        >
          Save
        </button>
        <button
          className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
          type='button'
          onClick={() => router.push('/jobs')}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

// ...

export default JobEdit;
