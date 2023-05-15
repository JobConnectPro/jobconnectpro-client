import CompanyCard from './CompanyCard';
import { useState, useEffect } from 'react';
import { getCompanies } from '@/modules/fetchCompanies';
import CustomPagination from './CustomPagination';

const Company = () => {
  const [companies, setCompanies] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="mb-5 h-screen">
        <div className="w-full bg-blue-700 sticky top-16">
          <div className="mx-6">
            <div className="grid grid-cols-1 py-4 gap-2">
              <form>
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
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold mx-6 mt-5 mb-3">Company</h1>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-2 mx-6">
          {companies && companies.map((company) => <CompanyCard key={company.id} company={company}></CompanyCard>)}
          {companies == null && <p>No companies found</p>}
        </div>
        <div className="mt-8 mx-6">
          <CustomPagination currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} onPageChange={handlePageChange} />
        </div>{' '}
      </div>
    </>
  );
};

export default Company;
