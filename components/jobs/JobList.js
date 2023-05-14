import { getJobsList } from '@/modules/fetch';
import { useState, useEffect } from 'react';
import JobCard from './JobCard';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await getJobsList(
        searchQuery,
        currentPage,
        perPage,
        locationFilter,
        typeFilter,
        experienceFilter
      );
      setJobs(res);
      setTotalPages(res.totalPages);
    };
    fetchData();
  }, [
    searchQuery,
    currentPage,
    perPage,
    locationFilter,
    typeFilter,
    experienceFilter,
  ]);
  console.log(jobs);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
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
    return <div className="flex items-center justify-center mt-4">{pages}</div>;
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
  const types = ['Onsite', 'Remote'];
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

  console.log(locationFilter);
  console.log(experienceFilter);

  return (
    <div className="max-w-2xl mx-auto mb-5">
      <h1 className="text-3xl font-bold text-center mt-8 mb-4">Jobs</h1>
      {/* SearchBar */}
      <div className="mb-4">
        <input
          type="text"
          className="border-gray-400 border-2 py-2 px-4 w-full rounded-md"
          placeholder="Search jobs by title..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      {/* Filter */}
      <div className="flex justify-between mb-4">
        <div className="w-1/3">
          <select
            className="border p-1 rounded"
            value={locationFilter}
            onChange={handleLocationChange}
          >
            <option value="">Location (All)</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/3">
          <select
            className="border p-1 rounded"
            value={typeFilter}
            onChange={handleTypeChange}
          >
            <option value="">Type (All)</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/3">
          <select
            className="border p-1 rounded"
            value={experienceFilter}
            onChange={handleExperienceChange}
          >
            <option value="">Experience (All)</option>
            {experiences.map((experience) => (
              <option key={experience} value={experience}>
                {experience}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="border-gray-400 border-2 py-2 px-4 w-full rounded-md"
          placeholder="Search jobs by title..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex items-center mr-2">
          <span>Per page:</span>
          <select
            className="mx-2 border p-1"
            value={perPage}
            onChange={handlePerPageChange}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="flex items-center">
          <span>Page:</span>
          <div className="flex items-center ml-2">{renderPagination()}</div>
        </div>
      </div>
      <div className="grid gap-4">
        {jobs.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
      <div className="flex justify-center mt-4">{renderPagination()}</div>
    </div>
  );
};
export default JobList;
