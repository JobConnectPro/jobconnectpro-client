import { useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { deleteCompany, updateLogo } from '@/modules/fetchCompanies';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

const CompanyDetail = ({ res }) => {
    const company = res
    const jobs = company.Jobs
    const sector = company.Sector
    const [searchTerm, setSearchTerm] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const role = Cookies.get('role')
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };

    const filteredJobs = jobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    })
    

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteCompany(company.id);
            router.push('http://localhost:3000/employer/companies');
        } catch (error) {
            console.log(error)
        } finally {
            setIsDeleting(false);
        }
    };

    const handleUpdate = () => {
        router.push(`http://localhost:3000/employer/companies/edit/${company.id}`);
    }

    const onSubmit = async (data) => {
        try {
            const response = await updateLogo(data, company.id);
            // console.log(response);
            reset();
        } catch (error) {
            console.error(error);
        }
        };

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
                        {role == 'Employer' && (
                            <div>
                                <button className='bg-red-600' onClick={handleDelete}>Delete</button>
                                <button className='bg-blue-600' onClick={handleUpdate}>Update</button>
                            </div>
                        )}
                    </div>
                </div>
                <div class="lg:1/4 px-4 py-8">
                    <div className='w-24 h-24 bg-slate-600 rounded-md'>
                        <img src={company.logo}></img>
                    </div>
                    {role == 'Employer' && (
                        <div>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
                        <div className="mb-4">
                            <input
                                type="file"
                                id="logo"
                                name="logo"
                                {...register('logo', { required: true })}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.website ? 'border-red-500' : ''}`}
                            />
                            {errors.logo && <span className="text-red-500 text-sm">This field is required</span>}
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Change Logo
                            </button>
                        </div>
                </form>
                        </div>
                    )}
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