import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { getCategoryList } from '@/modules/fetch';
import Select from 'react-select';

const JobEdit = ({ job }) => {
  const router = useRouter();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
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
    starting_date: new Date(job.starting_date).toISOString().split('T')[0],
    minimum_experience: job.minimum_experience,
    status: job.status,
  });

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

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategorySelect = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const categoryIds = selectedCategories.map((category) => category.value);

    const formDataWithCategories = {
      ...formData,
      categoryIds: categoryIds,
    };
    try {
      const { id } = job;
      const response = await fetch(`http://localhost:8000/jobs/${id}`, {
        method: 'PUT',
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

  return (
    <div className="mt-[22px]">
      <h1 className="mx-6 mb-4 text-3xl font-bold">Edit Job</h1>
      <form onSubmit={handleEditSubmit} className="space-y-4 mx-6 mb-10">
        <div className="">
          <label className="">
            Title<span className="required text-red-600 text-lg">*</span>
          </label>
          <input className="w-full px-4 py-2 border rounded-md" type="text" name="title" value={formData.title} onChange={handleInputChange} required />
        </div>

        <div className="">
          <label className="">
            Location<span className="required text-red-600 text-lg">*</span>
          </label>
          <input className="w-full px-4 py-2 border rounded-md" type="text" name="location" value={formData.location} onChange={handleInputChange} required />
        </div>

        <div className="">
          <label className="">
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

        <div className="">
          <label className="font-bold">
            Categories<span className="required text-red-600 text-lg">*</span>
          </label>
          <Select
              name='categoryIds'
              defaultValue={formData.categoryIds}
              onChange={handleCategorySelect}
              options={categoryOptions}
              isMulti
              className='basic-multi-select'
              classNamePrefix='select'
            />
        </div>

        <div className="">
          <label className="">
            Requirement<span className="required text-red-600 text-lg">*</span>
          </label>
          <textarea className="w-full px-4 py-2 border rounded-md" name="requirement" value={formData.requirement} onChange={handleInputChange} cols="4" rows="8" required></textarea>
        </div>

        <div className="">
          <label className="">
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

        <div className="">
          <label className="">
            Type<span className="required text-red-600 text-lg">*</span>
          </label>
          <input className="w-full px-4 py-2 border rounded-md" type="text" name="type" value={formData.type} onChange={handleInputChange} required />
        </div>

        <div className="">
          <label className="">Minimum Salary</label>
          <input className="w-full px-4 py-2 border rounded-md" type="number" name="minimum_salary" value={formData.minimum_salary} onChange={handleInputChange} required />
        </div>

        <div className="">
          <label className="">Maximum Salary</label>
          <input className="w-full px-4 py-2 border rounded-md" type="number" name="maximum_salary" value={formData.maximum_salary} onChange={handleInputChange} required />
        </div>

        <div className="">
          <label className="">Starting Date</label>
          <input className="w-full px-4 py-2 border rounded-md" type="date" name="starting_date" value={formData.starting_date} onChange={handleInputChange} required />
        </div>

        <div className="">
          <label className="">
            Minimum Experience<span className="required text-red-600 text-lg">*</span>
          </label>
          <input className="w-full px-4 py-2 border rounded-md" type="number" name="minimum_experience" value={formData.minimum_experience} onChange={handleInputChange} required />
        </div>

        <div className="">
          <label className="">
            Status<span className="required text-red-600 text-lg">*</span>
          </label>
          <select className="w-full px-4 py-2 border rounded-md" name="status" value={formData.status} onChange={handleInputChange} required>
            <option value="1">Open</option>
            <option value="0">Closed</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" type="button" onClick={handleEditSubmit}>
            Submit
          </button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => router.push('/employer/job')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// ...

export default JobEdit;
