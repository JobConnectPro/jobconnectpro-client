import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { getSectors, updateCompany } from '@/modules/fetchCompanies';
import { toast } from 'react-toastify';

const CompanyUpdate = ({ res }) => {
  const prevCompany = res;
  const [sectors, setSectors] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  useEffect(() => {
    const fetchSectors = async () => {
      const response = await getSectors();
      setSectors(response);
    };

    fetchSectors();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await updateCompany(data, prevCompany.id);
      toast.success(response.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      // reset();
      router.push(`http://localhost:3000/employer/companies/${prevCompany.id}`);
    } catch (error) {
      console.error(error);
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  return (
    <div className="mt-[22px]">
      <h1 className="mx-6 mb-4 text-3xl font-bold">Edit Company</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mx-6 mb-10">
        <div className="mb-4">
          <label htmlFor="company_name">
            Company Name<span class="required text-red-600 text-lg">*</span>
          </label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            defaultValue={prevCompany?.company_name}
            {...register('company_name', { required: true })}
            className={`appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.company_name ? 'border-red-500' : ''}`}
          />
          {errors.company_name && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="sector_id">
            Sector<span class="required text-red-600 text-lg">*</span>
          </label>
          <select
            id="sector_id"
            name="sector_id"
            defaultValue={prevCompany?.Sector.id}
            {...register('sector_id', { required: true })}
            className={`appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.sector_id ? 'border-red-500' : ''}`}
          >
            <option value="">Select a sector</option>
            {sectors.map((sector) => (
              <option key={sector.id} value={sector.id}>
                {sector.sector}
              </option>
            ))}
          </select>
          {errors.sector_id && <span className="text-red-500 text-sm">Please select a sector</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="address">
            Address<span class="required text-red-600 text-lg">*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            defaultValue={prevCompany?.address}
            {...register('address', { required: true })}
            className={`appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.address ? 'border-red-500' : ''}`}
          />
          {errors.address && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="description">
            Description<span class="required text-red-600 text-lg">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={prevCompany?.description}
            {...register('description', { required: true })}
            className={`appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.website ? 'border-red-500' : ''}`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="website">
            Website<span class="required text-red-600 text-lg">*</span>
          </label>
          <input
            type="text"
            id="website"
            name="website"
            defaultValue={prevCompany?.website}
            {...register('website', { required: true })}
            className={`appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.website ? 'border-red-500' : ''}`}
          />
          {errors.website && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => {
              router.push(`http://localhost:3000/employer/companies/${prevCompany.id}`);
            }}
            className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
export default CompanyUpdate;
