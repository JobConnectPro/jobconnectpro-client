import CompanyCard from '@/components/company/CompanyCard';
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
        <div className='container mx-auto px-4 pt-24'>
            <h1 className='text-2xl font-bold'>Companies</h1>
            <div className='flex justify-between'>           
                <input
                    type='text'
                    placeholder='Search company'
                    className='border border-gray-400 px-2 py-1 rounded-l'
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                />
                <button className='bg-orange-400'><Link href='/employer/companies/create' >New Company</Link></button>
            </div>
            <div className='mt-4'>
                {companies.length > 0 ? (companies.map((company) => (
                    <CompanyCard key={company.id} company={company}></CompanyCard>
                ))) : (
                    <p>No companies found</p>
                )}
            </div>
        </div>
    );
}

export default CompanyEmployer