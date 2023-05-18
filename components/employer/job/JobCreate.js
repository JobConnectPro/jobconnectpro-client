import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { createJob, getCategoryList, getCompanyList } from '@/modules/fetch';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function JobCreate() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    company_id: '',
    description: '',
    categoryIds: [],
    requirement: '',
    job_level: '',
    minimum_salary: null,
    maximum_salary: null,
    type: '',
    location: '',
    starting_date: null,
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
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        router.push('/employer/job');
        console.log(data);
      } else {
        toast.error(`${data.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
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

  const fetchCompanyList = async () => {
    try {
      const response = await fetch(`http://localhost:8000/companies/user/${Cookies.get('id')}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
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
    fetchCategories();
    fetchCompanyList();
  }, []);

  return (
    <div className="mt-[22px]">
      <h1 className="mx-6 mb-4 text-3xl font-bold">Create Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mx-6 mb-10">
        <div>
          <label htmlFor="title" className="">
            Title<span class="required text-red-600 text-lg">*</span>
          </label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required className="w-full border border-gray-300 rounded-md p-2" />
        </div>

        <div>
          <label htmlFor="company_id" className="">
            Company<span class="required text-red-600 text-lg">*</span>
          </label>
          <select id="company_id" name="company_id" value={formData.company_id} onChange={handleInputChange} required className="w-full border border-gray-300 rounded-md p-2">
            <option value="">Select a company</option>
            {companyOptions.map((company) => (
              <option key={company.value} value={company.value}>
                {company.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="">
            Description<span class="required text-red-600 text-lg">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
            cols="4"
            rows="8"
          ></textarea>
        </div>
        <div>
          <label htmlFor="categoryIds" className="">
            Categories<span class="required text-red-600 text-lg">*</span>
          </label>
          <select id="categoryIds" name="categoryIds" value={formData.categoryIds} onChange={handleCategorySelect} multiple required className="w-full border border-gray-300 rounded-md p-2">
            {categoryOptions.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="requirement" className="">
            Requirement<span class="required text-red-600 text-lg">*</span>
          </label>
          <textarea
            id="requirement"
            name="requirement"
            value={formData.requirement}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
            cols="4"
            rows="8"
          ></textarea>
        </div>

        <div>
          <label htmlFor="job_level" className="">
            Job Level<span class="required text-red-600 text-lg">*</span>
          </label>
          <select id="job_level" name="job_level" value={formData.job_level} onChange={handleInputChange} required className="w-full border border-gray-300 rounded-md p-2">
            <option value="">-- Select Type --</option>
            <option value="Internship/Ojt">Internship/Ojt</option>
            <option value="Entry-Level/Junior">Entry-Level/Junior</option>
            <option value="Associate/Supervisor">Associate/Supervisor</option>
            <option value="Associate/Supervisor">Mid-Senior-Level/Manager</option>
            <option value="Associate/Supervisor">Director/Executive</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="minimum_salary" className="">
              Minimum Salary
            </label>
            <input type="number" id="minimum_salary" name="minimum_salary" value={formData.minimum_salary} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label htmlFor="maximum_salary" className="">
              Maximum Salary
            </label>
            <input type="number" id="maximum_salary" name="maximum_salary" value={formData.maximum_salary} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2" />
          </div>
        </div>

        <div>
          <label htmlFor="type" className="">
            Type<span class="required text-red-600 text-lg">*</span>
          </label>
          <select id="type" name="type" value={formData.type} onChange={handleInputChange} required className="w-full border border-gray-300 rounded-md p-2">
            <option value="">-- Select Type --</option>
            <option value="Full-time">On-site</option>
            <option value="Part-time">Remote</option>
          </select>
        </div>

        <div>
          <label htmlFor="location" className="">
            Location<span class="required text-red-600 text-lg">*</span>
          </label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} required maxLength="255" className="w-full border border-gray-300 rounded-md p-2" />
        </div>

        <div>
          <label htmlFor="starting_date" className="">
            Starting Date
          </label>
          <input type="date" id="starting_date" name="starting_date" value={formData.starting_date} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2" />
        </div>

        <div>
          <label htmlFor="minimum_experience" className="">
            Minimum Experience<span class="required text-red-600 text-lg">*</span>
          </label>
          <input
            type="number"
            id="minimum_experience"
            name="minimum_experience"
            value={formData.minimum_experience}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white font-bold rounded-md py-2">
          Create
        </button>
      </form>
    </div>
  );
}
