import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { createJob, getCategoryList, getCompanyList } from '@/modules/fetch';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Select from 'react-select';
import Loading from '@/components/loading/Loading';

export default function JobCreate() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    company_id: '',
    description: '',
    categoryIds: [],
    requirement: '',
    job_level: '',
    minimum_salary: 0,
    maximum_salary: 0,
    type: '',
    location: '',
    starting_date: undefined,
    minimum_experience: '',
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategorySelect = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryIds = selectedCategories.map((category) => category.value);

    const formDataWithCategories = {
      ...formData,
      categoryIds: categoryIds,
    };
    try {
      const response = await fetch('http://localhost:8000/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify(formDataWithCategories),
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
      const options = categories.map((category) => ({
        value: category.id,
        label: category.category,
      }));
      setCategoryOptions(options);
    } catch (error) {
      console.log(error);
    }
  };

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
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-[22px]">
      <h1 className="mx-6 mb-4 text-3xl font-bold">Create Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mx-6 mb-10">
        <div>
          <label htmlFor="title">
            Title<span className="required text-red-600 text-lg">*</span>
          </label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required className="w-full border border-gray-300 rounded-md p-2" />
        </div>

        <div>
          <label htmlFor="company_id">
            Company<span className="required text-red-600 text-lg">*</span>
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
          <label htmlFor="description">
            Description<span className="required text-red-600 text-lg">*</span>
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
        <div className="mb-4">
          <div>
            <label htmlFor="categoryIds">
              Categories<span className="required text-red-600 text-lg">*</span>
            </label>
            <Select
              name="categoryIds"
              defaultValue={formData.categoryIds}
              onChange={handleCategorySelect}
              options={categoryOptions}
              isMulti
              className="basic-multi-select w-full"
              classNamePrefix="select"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="requirement">
            Requirement<span className="required text-red-600 text-lg">*</span>
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
          <label htmlFor="job_level">
            Job Level<span className="required text-red-600 text-lg">*</span>
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
        {!isChecked && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="minimum_salary">Minimum Salary</label>
              <input type="number" id="minimum_salary" name="minimum_salary" value={formData.minimum_salary} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
              <label htmlFor="maximum_salary">Maximum Salary</label>
              <input type="number" id="maximum_salary" name="maximum_salary" value={formData.maximum_salary} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2" />
            </div>
          </div>
        )}
        <div>
          <label>
            <input
              className="mr-2"
              type="checkbox"
              checked={isChecked}
              onChange={() => {
                if (isChecked === true) {
                  setIsChecked(false);
                } else {
                  setIsChecked(true);
                  setFormData({ ...formData, minimum_salary: 0, maximum_salary: 0 });
                }
              }}
            />
            Hide Salary Range
          </label>
        </div>
        <div>
          <label htmlFor="type">
            Type<span className="required text-red-600 text-lg">*</span>
          </label>
          <select id="type" name="type" value={formData.type} onChange={handleInputChange} required className="w-full border border-gray-300 rounded-md p-2">
            <option value="">-- Select Type --</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Freelance">Freelance</option>
            <option value="Onsite">Onsite</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div>
          <label htmlFor="location">
            Location<span className="required text-red-600 text-lg">*</span>
          </label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} required maxLength="255" className="w-full border border-gray-300 rounded-md p-2" />
        </div>

        <div>
          <label htmlFor="starting_date">Starting Date</label>
          <input type="date" id="starting_date" name="starting_date" value={formData.starting_date} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2" />
        </div>

        <div>
          <label htmlFor="minimum_experience">
            Minimum Experience
            <span className="required text-red-600 text-lg">*</span>
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
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
