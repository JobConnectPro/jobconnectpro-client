import CompanyCard from './CompanyCard';
import { useState, useEffect } from 'react';
import { getCompanies } from '@/modules/fetchCompanies';
import CustomPagination from './CustomPagination';

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCompanies(searchQuery, currentPage);
        setCompanies(res.data);
        setTotalPages(res.totalPages);
        setTotalItems(res.totalItems);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentPage, searchQuery]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <>
      <div className="mb-5 h-screen">
        <div className="w-full bg-blue-700 sticky top-16">
          <div className="mx-6">
            <div className="py-4 gap-2 border-b border-slate-200">
              <form onSubmit={handleSubmit} className="flex">
                <div className="flex">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                    <input
                      type="search"
                      value={searchInput}
                      id="default-search"
                      name="search"
                      className="block w-full px-4 py-2 text-gray-900 rounded-lg"
                      placeholder="Search jobs by title.."
                      onChange={handleSearchInputChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg ml-3 hover:bg-green-400"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold mx-6 my-4">Company</h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-6">
          {companies.length > 0 ? (
            companies.map((company) => (
              <CompanyCard key={company.id} company={company}></CompanyCard>
            ))
          ) : (
            <p>No companies found</p>
          )}
        </div>
        <div className="mt-8 mx-6">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Company;
