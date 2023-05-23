import Layout from "@/components/layout/Dashboard";
import JobList from "@/components/seeker/job/JobList";
import { getJobsList } from "@/modules/fetch";
import { useState, useEffect } from "react";
import JobCard from "@/components/seeker/job/JobCard";
import CustomPagination from "@/components/employer/company/CustomPagination";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getJobsList();
        setJobs(res.data);
        setTotalPages(res.totalPages);
        setTotalItems(res.totalItems);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (searchTerm) => {
    const filteredResults = jobs.filter((job) => job.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(filteredResults);
  };

  return (
    <Layout handleSearch={handleSearch}>
      {/* <JobList /> */}
      <div className="mb-5 h-screen">
        <h1 className="text-3xl font-bold mx-6 my-4">Jobs</h1>
        {/* {JSON.stringify(searchResults.length > 0 ? searchResults : jobs)} */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-6">
          {searchResults.length > 0
            ? searchResults.map((job) => <JobCard key={job.id} job={job}></JobCard>)
            : jobs.map((job) => <JobCard key={job.id} job={job}></JobCard>)}
        </div>
        <div className="mt-8 mx-6 pb-10">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;

export const getServerSideProps = async (context) => {
  const { role, token } = context.req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  if (role !== "Seeker") {
    if (role === "Admin") {
      return {
        redirect: {
          destination: "/admin/profile",
          permanent: false,
        },
      };
    } else if (role === "Employer") {
      return {
        redirect: {
          destination: "/employer/profile",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      role,
    },
  };
};
