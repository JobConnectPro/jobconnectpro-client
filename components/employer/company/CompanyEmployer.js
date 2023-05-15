import CompanyCard from './CompanyCard';
import { useState, useEffect } from 'react';
import { getCompaniesEmployer } from '@/modules/fetchCompanies';
import Link from 'next/link';

const CompanyEmployer = () => {
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCompaniesEmployer(searchQuery);
        setCompanies(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [searchQuery]);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="mb-5 h-screen">
        <div className="w-full bg-blue-700 sticky top-16">
          <div className="mx-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 py-4 gap-2">
              <form className="col-span-1 lg:col-span-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                    id="default-search"
                    className="block w-full px-4 py-2 text-gray-900 rounded-lg "
                    placeholder="Search company by name.."
                    required
                  />
                </div>
              </form>
              <Link href="/employer/companies/create" className="justify-self-end">
                <button className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-5 rounded">Add Company</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 my-4">
          <h1 className="mx-6 text-3xl font-bold">Company</h1>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-6">
          {companies && companies.map((company) => <CompanyCard key={company.id} company={company}></CompanyCard>)}
          {companies == null && <p>No companies found</p>}
        </div>
      </div>
    </>
  );
};

export default CompanyEmployer;
