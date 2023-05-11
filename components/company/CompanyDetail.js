import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import { getCompanyDetail } from '@/modules/fetchCompanies';
import Link from 'next/link';

const CompanyDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    const [company,setCompany] = useState("")
    const [jobs,setJobs] = useState([])
    const [sector,setSector] = useState("")
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const res = await getCompanyDetail(id)
            setCompany(res)
            setJobs(res.Jobs)
            setSector(res.Sector)
        }
        fetchData()
    },[id])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };

    const filteredJobs = jobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    })
    
    console.log(filteredJobs)

    return (
        <div className='w-full p-4 pt-20'>
            <div class="flex flex-row bg-white">
                <div class="lg:w-3/4 px-4 py-8">
                    <div>
                        <div>
                            <p>{company.company_name}</p>
                        </div>
                        <div>
                            <p>office address</p>
                            <p>{company.address}</p>
                        </div>
                        <div>
                            <p>sector</p>
                            <p>{sector.sector}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>website</p>
                            <p>{company.website}</p>
                        </div>
                    </div>
                </div>
                <div class="lg:1/4 px-4 py-8">
                    <div className='w-24 h-24 bg-slate-600 rounded-md'>
                        <img src={company.logo}></img>
                    </div>
                </div>
            </div>
            <p>Description</p>
            <div className='bg-white mt-4 h-48'>
                <p>{company.description}</p>
            </div>
            <div class="flex flex-row bg-blue-700 mt-4 p-4">
                <div>
                    job opening di perusahaan
                </div>
                <div>
                    <input type='text' placeholder='find job' onChange={handleSearch}></input>
                </div>
            </div>
            <div class="flex flex-row bg-white">
               {filteredJobs.length > 0 ? filteredJobs.map((job) => (
                    <div key={job.id}>
                        <div className='h-24 w-24 bg-slate-600'>
                            <img src={company.logo}></img>
                        </div>
                        <div>
                            <div>
                                <p>{job.title}</p>
                                <p>{job.location}</p>
                                <p>{job.starting_date}</p>
                            </div>
                            <div>
                                <Link href={`http://localhost:3000/jobs/${job.id}`}>Detail</Link>
                            </div>
                        </div>
                    </div>
               )) : (
                <p>No job</p>
               )}
            </div>
        </div>
    )
}

export default  CompanyDetail