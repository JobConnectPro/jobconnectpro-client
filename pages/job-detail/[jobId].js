import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/homepage/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

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
        console.error("Error fetching jobs:", error);
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
      return "today";
    } else if (diffInDays === 1) {
      return "yesterday";
    } else {
      return `${diffInDays} days ago`;
    }
  };

  const startingDate = new Date(jobData.starting_date);
  const formattedStartingDate = startingDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white">
      <Header />
      <div className="px-14 pb-14">
        <div className="border border-gray-300 rounded-xl">
          <img className="w-full h-64 bg-[url('../public/owner.png')]" />
          <div className="bg-white mx-4 absolute mt-[-80px] shadow-gray-300 shadow-lg">
            {jobData.Company?.logo != null && (
              <Image
                loader={() => jobData.Company.logo}
                className=""
                src={jobData.Company.logo}
                alt="Profile Picture"
                width={150}
                height={150}
              />
            )}
            {jobData.Company?.logo == null && (
              <Image className="object-center" src="/img/blank-pp.jpg" alt="Profile Picture" width={150} height={150} />
            )}
          </div>
          <div className="bg-white pt-24 px-4">
            <h1 className="text-4xl font-semibold pb-4">{jobData.title}</h1>
            <p className="text-gray-700 text-lg font-semibold">
              {jobData.location} &#x2022; {jobData.type}
            </p>
            <p className="text-green-500 text-sm font-semibold border-b border-gray-300 pb-8">
              Posted {diffForHumans(jobData.createdAt)}
            </p>
          </div>
          {/* end of posted */}
          <div className="py-6 px-4">
            <h1 className="text-2xl font-bold py-2">Job Description</h1>
            <p className="text-gray-800">{jobData.description}</p>
            <div className="py-4">
              <h1 className="text-2xl font-bold py-2">Requirement</h1>
              <p className="text-gray-800 font-medium">{jobData.requirement}</p>
            </div>
            <h1 className="text-2xl font-bold py-2">Job Summary</h1>
            <div className="flex justify-between border-b border-gray-300 pb-8">
              <div>
                <h1 className="text-lg">Company</h1>
                <p className="text-blue-700 pb-2">{jobData.Company?.company_name}</p>
                <h1 className="text-lg">Job Level</h1>
                <p className="text-blue-700 pb-2">{jobData.job_level}</p>

                <h1 className="text-lg">Job Type</h1>
                <p className="text-blue-700 pb-2">{jobData.type}</p>

                <h1 className="text-lg">Company Address</h1>
                <p className="text-blue-700">{jobData.Company?.address}</p>
              </div>
              <div>
                <h1 className="text-lg">Sector</h1>
                <p className="text-blue-700 pb-2">{jobData.Company?.Sector?.sector}</p>
                <h1 className="text-lg">Job Category</h1>
                <p className="text-blue-700 pb-2">
                  {jobData.JobCategories?.map((category) => (
                    <p key={category.id}>{category.category}</p>
                  ))}
                </p>
                <h1 className="text-lg">Salary</h1>
                {jobData.minimum_salary !== 0 && (
                  <p className="text-blue-700">
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
                      jobData.minimum_salary
                    )}{" "}
                    -{" "}
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
                      jobData.maximum_salary
                    )}
                  </p>
                )}
                {jobData.minimum_salary === 0 && <p className="text-red-700">Private</p>}
              </div>
              <div>
                <h1 className="text-lg">Minimum Experience</h1>
                <p className="text-blue-700 pb-2">{jobData.minimum_experience} Year</p>
                <h1 className="text-lg">Starting Date</h1>
                <p className="text-blue-700 pb-2">{formattedStartingDate}</p>
                <h1 className="text-lg">Website</h1>
                <p className="text-blue-700">{jobData.Company?.website}</p>
              </div>
            </div>
          </div>
          {/* start company description */}
          <div className="px-4 mb-10">
            <h1 className="text-2xl font-bold py-2">Company Description</h1>
            <p>{jobData.Company?.description}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
