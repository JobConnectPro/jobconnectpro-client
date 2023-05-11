import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { createJob, getCategoryList, getCompanyList } from '@/modules/fetch';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function CreateJob() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    company_id: '',
    description: '',
    categoryIds: [],
    requirement: '',
    job_level: '',
    minimum_salary: '',
    maximum_salary: '',
    type: '',
    location: '',
    starting_date: '',
    minimum_experience: '',
  });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify(formData),
      });
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
      toast.error(`${err.message}`, {
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

  const fetchCategories = async () => {
    try {
      const categories = await getCategoryList();
      setCategoryOptions(categories);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(categoryOptions);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCompanyList = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/companies/user/${Cookies.get('id')}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const companies = data.map((company) => ({
          value: company.id,
          label: company.company_name,
        }));
        console.log(companies);
        setCompanyOptions(companies);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompanyList();
  }, []);

  return (
    <div className='w-1/2 mx-auto p-4'>
      <h1 class='text-3xl font-bold mb-4'>Create Job</h1>
      <form onSubmit={handleSubmit} class='space-y-4'>
        <div>
          <label htmlFor='title' class='block font-bold'>
            Title:
          </label>
          <input
            type='text'
            id='title'
            name='title'
            value={formData.title}
            onChange={handleInputChange}
            required
            class='w-full border border-gray-300 rounded-md p-2'
          />
        </div>

        <div>
          <label htmlFor='company_id' class='block font-bold'>
            Company:
          </label>
          <select
            id='company_id'
            name='company_id'
            value={formData.company_id}
            onChange={handleInputChange}
            required
            class='w-full border border-gray-300 rounded-md p-2'
          >
            <option value=''>Select a company</option>
            {companyOptions.map((company) => (
              <option key={company.value} value={company.value}>
                {company.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor='description' class='block font-bold'>
            Description:
          </label>
          <input
            type='text'
            id='description'
            name='description'
            value={formData.description}
            onChange={handleInputChange}
            required
            class='w-full border border-gray-300 rounded-md p-2'
          />
        </div>

        <div>
          <label htmlFor='categoryIds' class='block font-bold'>
            Categories:
          </label>
          <select
            id='categoryIds'
            name='categoryIds'
            value={formData.categoryIds}
            onChange={handleCategorySelect}
            multiple
            required
            class='w-full border border-gray-300 rounded-md p-2'
          >
            {categoryOptions.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor='requirement' class='block font-bold'>
            Requirement:
          </label>
          <textarea
            id='requirement'
            name='requirement'
            value={formData.requirement}
            onChange={handleInputChange}
            required
            class='w-full border border-gray-300 rounded-md p-2'
          ></textarea>
        </div>

        <div>
          <label htmlFor='job_level' class='block font-bold'>
            Job Level:
          </label>
          <input
            type='text'
            id='job_level'
            name='job_level'
            value={formData.job_level}
            onChange={handleInputChange}
            required
            class='w-full border border-gray-300 rounded-md p-2'
          />
        </div>

        <div class='grid grid-cols-2 gap-4'>
          <div>
            <label htmlFor='minimum_salary' class='block font-bold'>
              Minimum Salary:
            </label>
            <input
              type='number'
              id='minimum_salary'
              name='minimum_salary'
              value={formData.minimum_salary}
              onChange={handleInputChange}
              required
              class='w-full border border-gray-300 rounded-md p-2'
            />
          </div>
          <div>
            <label htmlFor='maximum_salary' class='block font-bold'>
              Maximum Salary:
            </label>
            <input
              type='number'
              id='maximum_salary'
              name='maximum_salary'
              value={formData.maximum_salary}
              onChange={handleInputChange}
              required
              class='w-full border border-gray-300 rounded-md p-2'
            />
          </div>
        </div>

        <div>
          <label htmlFor='type' class='block font-bold'>
            Type:
          </label>
          <select
            id='type'
            name='type'
            value={formData.type}
            onChange={handleInputChange}
            required
            class='w-full border border-gray-300 rounded-md p-2'
          >
            <option value=''>-- Select Type --</option>
            <option value='Full-time'>On-site</option>
            <option value='Part-time'>Remote</option>
          </select>
        </div>

        <div>
          <label htmlFor='location' class='block font-bold'>
            Location:
          </label>
          <input
            type='text'
            id='location'
            name='location'
            value={formData.location}
            onChange={handleInputChange}
            required
            class='w-full border border-gray-300 rounded-md p-2'
          />
        </div>

        <div>
          <label htmlFor='starting_date' class='block font-bold'>
            Starting Date:
          </label>
          <input
            type='date'
            id='starting_date'
            name='starting_date'
            value={formData.starting_date}
            onChange={handleInputChange}
            required
            class='w-full border border-gray-300 rounded-md p-2'
          />
        </div>

        <div>
          <label htmlFor='minimum_experience' class='block font-bold'>
            Minimum Experience:
          </label>
          <input
            type='number'
            id='minimum_experience'
            name='minimum_experience'
            value={formData.minimum_experience}
            onChange={handleInputChange}
            required
            class='w-full border border-gray-300 rounded-md p-2'
          />
        </div>

        <button
          type='submit'
          class='w-full bg-green-500 text-white font-bold rounded-md py-2'
        >
          Create
        </button>
      </form>
    </div>
  );
}
