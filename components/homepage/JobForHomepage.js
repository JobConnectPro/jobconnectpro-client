import { useState, useEffect } from 'react';
import axios from 'axios';
import JobCardHome from './JobCardHome';

export default function JobForHomepage() {
  const [jobs, setJobs] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const jobsPerSlide = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/job');
        setJobs(res.data.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchData();
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide + 1);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  const startIndex = currentSlide * jobsPerSlide;
  const visibleJobs = jobs.slice(startIndex, startIndex + jobsPerSlide * 2);

  return (
    <div className="w-full px-14 items-center bg-white">
      <h1 className="w-full text-center items-center mx-auto font-bold text-2xl md:text-3xl mb-8">
        Find a Career <br />
        <span className="text-blue-700"> That Works For You </span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="col-span-1 lg:col-span-2">
          <div className="flex flex-col lg:flex-row gap-4">
            {visibleJobs.slice(0, jobsPerSlide).map((job) => (
              <div key={job.id} className="flex-1">
                <JobCardHome job={job} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 lg:col-span-2 mt-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {visibleJobs.slice(jobsPerSlide, jobsPerSlide * 2).map((job) => (
              <div key={job.id} className="flex-1">
                <JobCardHome job={job} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <button className={`${currentSlide === 0 ? 'hidden' : 'block'} bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none`} onClick={handlePrevSlide}>
          Previous
        </button>
        {startIndex + jobsPerSlide * 2 < jobs.length && (
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none ml-2" onClick={handleNextSlide}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
