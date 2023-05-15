import { useEffect, useState } from 'react';
import Link from 'next/link';
import { deleteCompany, updateLogo } from '@/modules/fetchCompanies';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { getCompanyUpdate } from '@/modules/fetchCompanies';

const CompanyDetailEmployer = ({ res }) => {
    const [company, setCompany] = useState(res)
    const jobs = company.Jobs
    const sector = company.Sector
    const [searchTerm, setSearchTerm] = useState("");
    const [isDelete, setIsDelete] = useState(false);
    const router = useRouter();
    const [isUpload, setIsUpload] = useState(false)
    const [isLogo, setIsLogo] = useState(false)
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
            await deleteCompany(company.id);
            router.push('http://localhost:3000/employer/companies');
        } catch (error) {
            console.log(error)
        } finally {
            setIsDelete(false);
        }
    };

    const handleUpdate = () => {
        router.push(`http://localhost:3000/employer/companies/edit/${company.id}`);
    }

    const onSubmit = async (data) => {
        try {
            const response = await updateLogo(data, company.id);
            setIsLogo(false)
            const fetchNewCompany = await getCompanyUpdate(company.id)
            setCompany(fetchNewCompany)
        } catch (error) {
            console.error(error);
        }
    };
        
    return (
        <div className='max-w-screen-lg p-8 pt-10 mx-auto'>
    <div className='rounded-sm overflow-hidden'>
        <div className='bg-blue-500 p-4 flex justify-between'>
            <p className='text-lg text-white'>Profile</p>
            <div>
                <button className='text-lg  hover:text-green-300 text-white mr-4' onClick={() => { setIsUpload(true); setIsDelete(false); }}>Update</button>
                <button className='text-lg  text-white hover:text-red-400' onClick={() => {
                    setIsDelete(true); setIsUpload(false); setIsLogo(false);
                }}>Delete</button>
            </div>
        </div>
        {isDelete == true && (
            <div className='bg-blue-500 my-2 py-4'>
            <p className='flex justify-center text-lg text-white'>
                Are you sure, delete this company?</p>
            <div className='flex justify-center text-lg space-x-4 mt-4'>
                <button className='hover:bg-blue-200 px-2 hover:text-white text-blue-500 bg-white rounded-md' onClick={() => {
                    setIsDelete(false)
                }}>Cancel</button>
                <button className='hover:bg-red-400 px-2 hover:text-white text-red-400 bg-white rounded-md' onClick={handleDelete}>Sure !</button>
            </div>
        </div>
        )}
        {isUpload == true &&(
            <div className='bg-blue-500 my-2 pb-4'>
                <span onClick={() => {setIsUpload(false)}} className='text-xl font-semibold hover: cursor-pointer mr-2 mt-1 text-white flex justify-end'>X</span>
            <div className='flex justify-center text-lg space-x-4'>
                <button className='hover:bg-blue-200 px-2 hover:text-white text-blue-500 bg-white rounded-md' onClick={handleUpdate}>Update Data</button>
                <button className='hover:bg-red-400 px-2 hover:text-white text-red-400 bg-white rounded-md' onClick={() => { setIsLogo(true); setIsUpload(false); }}>Update Logo</button>
            </div>
        </div>
        )}
        {isLogo == true && (
                <form onSubmit={handleSubmit(onSubmit)} className='bg-blue-500 my-2 py-4 flex justify-center space-x-4'>
                    <input
                        className='bg-white p-1 rounded-sm'
                        type="file"
                        id="logo"
                        name="logo"
                        {...register('logo', { required: true })}></input>
                    <div className='text-lg space-x-4 my-auto'>
                        <button className='hover:bg-blue-200 px-2 hover:text-white text-blue-500 bg-white rounded-md' type='submit'>Update</button>
                        <button className='hover:bg-red-400 px-2 hover:text-white text-red-400 bg-white rounded-md' onClick={() => { setIsLogo(false) }}>Cancel</button>
                    </div>
                </form>
        )}
        <div className='flex flex-row bg-white justify-between'>
            <div className='flex lg:w-3/4 px-4 py-4 mx-5'>
                <div>
                    <div className='mb-4'>
                        <p className='text-2xl font-semibold'>{company.company_name}</p>
                    </div>
                    <div className='mb-2 ml-4'>
                        <p>Office Address</p>
                        <p>{company.address}</p>
                    </div>
                    <div className='mb-2 ml-4'>
                        <p>Sector</p>
                        <p>{sector.sector}</p>
                    </div>
                    <div className='ml-4'>
                        <p>Website</p>
                        <p>{company.website}</p>
                    </div>
                </div>
            </div>
            <div className='lg:1/4 px-4 py-8'>
                <img className='w-44 h-44 rounded-md' src={company.logo ? company.logo : 'https://talentclick.com/wp-content/uploads/2021/08/placeholder-image-300x200.png'}></img>
            </div>
        </div>
    </div>
    <div className='mt-4 rounded-sm overflow-hidden'>
        <div className='bg-blue-500 p-4'>
            <p className='text-lg text-white'>Description</p>
        </div>
        <div className='bg-white h-48 px-8 py-5'>
            <p>{company.description}</p>
        </div>
    </div>
    <div className='mt-4 rounded-sm overflow-hidden'>
        <div className='flex flex-row bg-blue-500 p-4 justify-between'>
            <div>
                <p className='text-lg text-white'>Job opening in Company</p>
            </div>
            <div>
                <input className='w-72 rounded-md' type='text' placeholder='Find job in Company' onChange={handleSearch}></input>
            </div>
        </div>
        <div className='overflow-x-auto bg-white px-8 py-5'>
        {filteredJobs.length > 0 ? filteredJobs.map((job) => (
                    <div key={job.id} className='flex mb-4'>
                        <img src={company.logo ? company.logo : 'https://talentclick.com/wp-content/uploads/2021/08/placeholder-image-300x200.png'} className="w-24 h-24 rounded-xl shadow-sm mr-5"></img>
                        <div>
                            <div>
                                <p className='font-semibold'>{job.title}</p>
                                <p className="text-gray-700">{job.location}</p>
                                <p className="text-gray-700">{job.starting_date}</p>
                            </div>
                            <div>
                                <Link className="font-semibold text-blue-500 hover:text-blue-700" href={`http://localhost:3000/jobs/${job.id}`}>Detail</Link>
                            </div>
                        </div>
                    </div>
               )) : (
                <p>No job found</p>
               )}
        </div>
    </div>
</div>

    )
}
export default  CompanyDetailEmployer