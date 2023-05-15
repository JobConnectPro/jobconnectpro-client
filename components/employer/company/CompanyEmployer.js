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
    <div className='container mx-auto px-4 pt-24 h-screen'>
        <h1 className='text-2xl font-bold'>Companies</h1>
        <div className='flex justify-center'>
            <input
                type='text'
                placeholder='Search company'
                className='border border-gray-400 px-2 py-1 rounded-l w-2/4 mr-2'
                value={searchQuery}
                onChange={handleSearchQueryChange}
            />
            <button className='px-4 py-2 bg-teal-500 text-white font-semibold rounded-md shadow-md hover:bg-teal-600'>
                <Link href='/employer/companies/create' >
                    New Company
                </Link>
            </button>
        </div> 
        <div className='mt-4 grid justify-items-center'>
            {companies && companies.map((company) => (
                <CompanyCard key={company.id} company={company}></CompanyCard>
            ))}
            {companies == null && (
                <p>No companies found</p>
            )}
        </div>
    </div>
    );
}  

export default CompanyEmployer