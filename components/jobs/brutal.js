import { getJobsList } from '@/modules/fetch';
import { useState, useEffect } from 'react';
import JobPagination from './JobPagination';
import axios from 'axios';
import Cookies from 'js-cookie';
import JobCard from './JobCard';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await getJobsList(
        searchQuery,
        currentPage,
        locationFilter,
        typeFilter,
        experienceFilter
      );
      setJobs(res.data);
      const totalItems = res.data.length;
      const totalPagesCount = Math.ceil(totalItems / 10); // Menambahkan pembagian dengan 10 karena asumsi setiap halaman menampilkan 10 pekerjaan

      setTotalPages(totalPagesCount);

      if (currentPage > totalPagesCount && totalPagesCount > 0) {
        setCurrentPage(totalPagesCount);
      } else if (totalPagesCount === 0) {
        setCurrentPage(1);
      }
    };

    fetchData();
  }, [searchQuery, currentPage, locationFilter, typeFilter, experienceFilter]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`border ${
            i === currentPage ? 'bg-blue-500 text-white' : ''
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
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

  const locations = ['Surabaya', 'Jakarta', 'Los Angeles', 'Chicago', 'Boston'];
  const types = ['On-Site', 'Remote'];
  const experiences = [1, 2, 3, 4, 5];

  const filteredJobs = jobs.filter((job) => {
    if (locationFilter && job.location !== locationFilter) {
      return false;
    }
    if (typeFilter && job.type !== typeFilter) {
      return false;
    }
    if (experienceFilter && job.experience < experienceFilter) {
      return false;
    }
    return true;
  });

  const startIndex = (currentPage - 1) * 10;
  const endIndex = Math.min(startIndex + 10, filteredJobs.length);

  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  console.log(currentPage, totalPages);

  return (
    <div className='max-w-2xl mx-auto mb-5'>
      <h1 className='text-3xl font-bold text-center mt-8 mb-4'>Jobs</h1>
      <div className='flex justify-between mb-4'>
        <div className='w-1/3'>
          <select
            className='border p-1 rounded'
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
        </div>
        <div className='w-1/3'>
          <select
            className='border p-1 rounded'
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
        </div>
        <div className='w-1/3'>
          <select
            className='border p-1 rounded'
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
      <div className='mb-4'>
        <input
          className='border w-full p-2 rounded'
          type='text'
          placeholder='Search jobs...'
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      {paginatedJobs.length > 0 ? (
        paginatedJobs.map((job) => <JobCard job={job} key={job.id} />)
      ) : (
        <p className='text-center'>No jobs found.</p>
      )}

      <div>
        <div className='flex justify-between mb-4'>
          <div className='flex items-center'>
            <span>Page:</span>
            <div className='flex items-center ml-2'>{renderPagination()}</div>
          </div>
        </div>
        {/* <div className='flex flex-col'>{renderItems()}</div> */}
      </div>
    </div>
  );
};

export default JobList;
