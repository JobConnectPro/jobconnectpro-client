import { useState, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { getSectors, updateCompany } from '@/modules/fetchCompanies';

const CompanyUpdate  = ({res}) => {
    const prevCompany = res
    const [sectors, setSectors] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
      
    useEffect(() => {
        const fetchSectors = async () => {
            const response = await getSectors()
            setSectors(response);
        };
      
        fetchSectors();
    }, []);
      
    const onSubmit = async (data) => {
        try {
            const response = await updateCompany(data, prevCompany.id);
            console.log(response);
            // reset();
            router.push(`http://localhost:3000/employer/companies/${prevCompany.id}`);
        } catch (error) {
            console.error(error);
        }
        };
        
    return (
        <div className="container mx-auto px-4 pt-4 h-screen">
            <h1 className='text-2xl font-bold'>Update Company</h1>
            <div className="flex items-center justify-center">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md rounded-md border-blue-500 bg-white shadow-md p-5">
                    <div className="mb-4">
                        <label htmlFor="company_name" className="block text-gray-700 font-bold mb-2">
                            Company Name
                        </label>
                        <input
                            type="text"
                            id="company_name"
                            name="company_name"
                            defaultValue={prevCompany?.company_name}
                            {...register('company_name', { required: true })}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.company_name ? 'border-red-500' : ''}`}
                            />
                        {errors.company_name && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="sector_id" className="block text-gray-700 font-bold mb-2">
                            Sector
                        </label>
                        <select
                            id="sector_id"
                            name="sector_id"
                            defaultValue={prevCompany?.Sector.id}
                            {...register('sector_id', { required: true })}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.sector_id ? 'border-red-500' : ''}`}
                        >
                        <option value="">Select a sector</option>
                        {sectors.map((sector) => (
                            <option key={sector.id} value={sector.id}>{sector.sector}</option>
                        ))}
                        </select>
                        {errors.sector_id && <span className="text-red-500 text-sm">Please select a sector</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            defaultValue={prevCompany?.address}
                            {...register('address', { required: true })}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.address ? 'border-red-500' : ''}`}
                        />
                        {errors.address && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={prevCompany?.description}
                            {...register('description', { required: true })}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.website ? 'border-red-500' : ''}`}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="website" className="block text-gray-700 font-bold mb-2">
                            Website
                        </label>
                        <input
                            type="text"
                            id="website"
                            name="website"
                            defaultValue={prevCompany?.website}
                            {...register('website', { required: true })}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.website ? 'border-red-500' : ''}`}
                        />
                        {errors.website && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                        <button
                        onClick={() => {
                            router.push(`http://localhost:3000/employer/companies/${prevCompany.id}`)
                        }}
                            className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CompanyUpdate