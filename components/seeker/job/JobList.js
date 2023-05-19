import { getJobsList } from '@/modules/fetch';
import { useState, useEffect } from 'react';
import JobCard from './JobCard';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');

  const fetchDataJobs = async () => {
    try {
      const res = await getJobsList(
        searchQuery,
        currentPage,
        perPage,
        locationFilter,
        typeFilter,
        experienceFilter
      );
      setJobs(res.data);
      setTotalPages(res.totalPages);
      console.log(res)
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  useEffect(() => {
    fetchDataJobs();
  }, [
    searchQuery,
    currentPage,
    perPage,
    locationFilter,
    typeFilter,
    experienceFilter,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    setSearchQuery(searchValue);
    setCurrentPage(1);

    if (!searchValue) {
      setSearchQuery('');
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`border px-4 py-2 rounded ${
            i === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700'
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return <div className='flex items-center justify-center mt-4'>{pages}</div>;
  };

  const handleLocationChange = (e) => {
    setLocationFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleExperienceChange = (e) => {
    setExperienceFilter(e.target.value);
    setCurrentPage(1);
  };

  const locations = ['Surabaya', 'Jakarta', 'Jogja', 'Malang', 'Bandung'];
  const types = ['Onsite', 'Remote', 'Full Time', 'Part Time', 'Freelance'];
  const experiences = [1, 2, 3, 4, 5];

  const filteredJobs = jobs.filter((job) => {
    if (locationFilter && job.location !== locationFilter) {
      return false;
    }
    if (typeFilter && job.type !== typeFilter) {
      return false;
    }
    if (experienceFilter && job.minimum_experience < experienceFilter) {
      return false;
    }
    return true;
  });

  console.log(experienceFilter)

  return (
    <div className='mb-5'>
      <div className='w-full bg-blue-700 sticky top-16'>
        <div className='mx-6'>
          <div className='py-4 gap-2 border-b border-slate-200'>
            <form onSubmit={handleSubmit} className='flex'>
              <div className='relative flex-grow'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'></div>
                <input
                  type='search'
                  defaultValue={searchQuery}
                  id='default-search'
                  name='search'
                  className='block w-full px-4 py-2 text-gray-900 rounded-lg'
                  placeholder='Search jobs by title..'
                />
              </div>
              <button
                type='submit'
                className='px-4 py-2 text-white bg-blue-500 rounded-lg ml-3 hover:bg-green-400'
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <div className='grid gap-x-5 mx-6 py-4 grid-cols-3 text-center items-center'>
          <select
            className='border p-2 rounded-lg text-gray-500'
            value={locationFilter}
            onChange={handleLocationChange}
          >
            <option value=''>Location (All)</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <select
            className='border p-2 rounded-lg text-gray-500'
            value={typeFilter}
            onChange={handleTypeChange}
          >
            <option value=''>Type (All)</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            className='border p-2 rounded-lg text-gray-500'
            value={experienceFilter}
            onChange={handleExperienceChange}
          >
            <option value=''>Experience (All)</option>
            {experiences.map((experience) => (
              <option key={experience} value={experience}>
                {experience}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='flex justify-between my-4 mx-6'>
        <div className='flex items-center mr-2'>
          <span>Show:</span>
          <select
            className='mx-2 border rounded-lg p-1'
            value={perPage}
            onChange={handlePerPageChange}
          >
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='50'>50</option>
          </select>
        </div>
      </div>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-6'>
      {filteredJobs.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
      <div className='flex justify-center mt-4'>{renderPagination()}</div>
    </div>
  );
};
export default JobList;
