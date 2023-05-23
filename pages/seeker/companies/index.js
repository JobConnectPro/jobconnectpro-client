import Layout from "@/components/layout/Dashboard";
import Company from "@/components/employer/company/Company";
import React, { useState, useEffect } from "react";
import { getCompanies } from "@/modules/fetchCompanies";
import CompanyCard from "@/components/employer/company/CompanyCard";
import CustomPagination from "@/components/employer/company/CustomPagination";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCompanies();
        setCompanies(res.data);
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
    const filteredResults = companies.filter((company) =>
      company.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  };
  return (
    <Layout handleSearch={handleSearch}>
      {/* <Company /> */}
      <div className="mb-5 h-screen">
        <h1 className="text-3xl font-bold mx-6 my-4">Company</h1>
        {/* {JSON.stringify(searchResults.length > 0 ? searchResults : companies)} */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-6">
          {searchResults.length > 0
            ? searchResults.map((company) => <CompanyCard key={company.id} company={company}></CompanyCard>)
            : companies.map((company) => <CompanyCard key={company.id} company={company}></CompanyCard>)}
        </div>
        <div className="mt-8 mx-6 pb-10">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        </div>
        {/* <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-6">
          {companies.length > 0 ? (
            companies.map((company) => <CompanyCard key={company.id} company={company}></CompanyCard>)
          ) : (
            <p>No companies found</p>
          )}
        </div> */}
      </div>
    </Layout>
  );
};

export default Companies;

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
