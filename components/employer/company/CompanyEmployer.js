import CompanyCard from './CompanyCard';
import { useState, useEffect } from 'react';
import { getCompaniesEmployer } from '@/modules/fetchCompanies';
import Link from 'next/link';
import Loading from '@/components/loading/Loading';

const CompanyEmployer = () => {
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCompaniesEmployer(searchQuery);
        setCompanies(res);
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [searchQuery]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(searchInput);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="mb-5 h-screen">
        <div className="w-full bg-blue-700 sticky top-16">
          <div className="mx-6">
            <div className="py-4 gap-2">
              <form onSubmit={handleSubmit} className="flex">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                  <input
                    type="search"
                    value={searchInput}
                    id="default-search"
                    name="search"
                    className="block w-full px-4 py-2 text-gray-900 rounded-lg"
                    placeholder="Search company by title..."
                    onChange={handleSearchInputChange}
                  />
                </div>
                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-lg ml-3 hover:bg-green-400">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 my-4">
          <h1 className="mx-6 text-3xl font-bold">My Company</h1>
          <Link href="/employer/companies/create" className="justify-self-end">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mx-6">Add Company</button>
          </Link>
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
