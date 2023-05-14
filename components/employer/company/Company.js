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
        <div className='container mx-auto px-4 pt-4 h-screen'>
        <h1 className='text-2xl font-bold'>Companies</h1>
        <div className='flex justify-center'>
            <input
                type='text'
                placeholder='Search company'
                className='border border-gray-400 px-2 py-1 rounded-l w-2/4'
                value={searchQuery}
                onChange={handleSearchQueryChange}
            />
        </div> 
        <div className='mt-4 grid justify-items-center'>
            {companies && companies.map((company) => (
                <CompanyCard key={company.id} company={company}></CompanyCard>
            ))}
            {companies == null && (
                <p>No companies found</p>
            )}
        </div>
        <div className='mt-4'>
            <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={handlePageChange}
            />
        </div>
        </div>
    );
};

export default Company;