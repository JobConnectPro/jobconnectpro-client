import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/homepage/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

export default function JobHome() {
  const router = useRouter();
  const [jobData, setJobData] = useState([]);
  const { jobId } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/job/${jobId}`);
        setJobData(res.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchData();
  }, [jobId]);

  const diffForHumans = (date) => {
    const now = new Date();
    const newDate = new Date(date);
    const diffInMs = Math.abs(now - newDate);
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'today';
    } else if (diffInDays === 1) {
      return 'yesterday';
    } else {
      return `${diffInDays} days ago`;
    }
  };

  const startingDate = new Date(jobData.starting_date);
  const formattedStartingDate = startingDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white">
      <Header />
      <div className="px-14 mb-10 mt-10">
        <div className="border border-gray-300 rounded-b-xl">
          <img className="w-full bg-cover bg-center h-64 bg-[url('../public/jobseeker.webp')]" />
          <div className="bg-white mx-4 absolute mt-[-80px] shadow-gray-300 shadow-lg">
            {jobData.Company?.logo != null && <Image loader={() => jobData.Company.logo} className="" src={jobData.Company.logo} alt="Profile Picture" width={150} height={150} />}
            {jobData.Company?.logo == null && <Image className="object-center" src="/img/blank-pp.jpg" alt="Profile Picture" width={150} height={150} />}
          </div>
          <div className="bg-white pt-24 px-4 pb-3 border-b">
            <h1 className="text-4xl font-bold">{jobData.title}</h1>
            <p className="text-gray-700 text-lg mb-3">
              {jobData.location} &#x2022; {jobData.type}
            </p>
            <p className="text-green-500 text-sm mb-4">Posted {diffForHumans(jobData.createdAt)}</p>
            <Link href="/signin">
              <div className="bg-blue-500 rounded-sm py-3 text-white mb-1 hover:bg-blue-700">
                <p className="text-center font-bold uppercase">Sign in to Apply</p>
              </div>
            </Link>
          </div>
          {/* end of posted */}
          <div className="py-6 px-4">
            <h1 className="text-2xl font-bold py-2">Job Description</h1>
            <p className="text-gray-800 text-justify">{jobData.description}</p>
            <div className="py-4">
              <h1 className="text-2xl font-bold py-2">Requirement</h1>
              <p className="text-gray-800 text-justify">{jobData.requirement}</p>
            </div>
            <div className="mb-2">
              <h1 className="text-2xl font-bold py-2">Job Summary</h1>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div>
                  <h1 className="text-lg text-gray-500 uppercase">Company</h1>
                  <p className="text-blue-700 pb-2">{jobData.Company?.company_name}</p>
                </div>
                <div>
                  <h1 className="text-lg text-gray-500 uppercase">Job Level</h1>
                  <p className="text-blue-700 pb-2">{jobData.job_level}</p>
                </div>
                <div>
                  <h1 className="text-lg text-gray-500 uppercase">Job Type</h1>
                  <p className="text-blue-700 pb-2">{jobData.type}</p>
                </div>
                <div>
                  <h1 className="text-lg text-gray-500 uppercase">Job Category</h1>
                  <p className="text-blue-700 pb-2">
                    {jobData.JobCategories?.map((category) => (
                      <p key={category.id}>{category.category}</p>
                    ))}
                  </p>
                </div>
                <div>
                  <h1 className="text-lg text-gray-500 uppercase">Sector</h1>
                  <p className="text-blue-700 pb-2">{jobData.Company?.Sector?.sector}</p>
                </div>
                <div>
                  <h1 className="text-lg text-gray-500 uppercase">Starting Date</h1>
                  <p className="text-blue-700 pb-2">{formattedStartingDate}</p>
                </div>
                <div>
                  <h1 className="text-lg text-gray-500 uppercase">Salary</h1>
                  {jobData.minimum_salary !== 0 && (
                    <p className="text-blue-700">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(jobData.minimum_salary)} -{' '}
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(jobData.maximum_salary)}
                    </p>
                  )}
                  {jobData.minimum_salary === 0 && <p className="text-red-700">Private</p>}
                </div>
                <div>
                  <h1 className="text-lg text-gray-500 uppercase">Minimum Experience</h1>
                  <p className="text-blue-700 pb-2">{jobData.minimum_experience} Year</p>
                </div>
                <div>
                  <h1 className="text-lg text-gray-500 uppercase">Company Address</h1>
                  <p className="text-blue-700">{jobData.Company?.address}</p>
                </div>
                <div>
                  <h1 className="text-lg text-gray-500 uppercase">Website</h1>
                  <p className="text-blue-700">{jobData.Company?.website}</p>
                </div>
              </div>
            </div>
          </div>
          {/* start company description */}
          <div className="px-4 mb-8">
            <h1 className="text-2xl font-bold py-2">Company Description</h1>
            <p className="text-justify">{jobData.Company?.description}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
