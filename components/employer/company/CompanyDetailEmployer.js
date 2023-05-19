import { useEffect, useState } from 'react';
import Link from 'next/link';
import { deleteCompany, updateLogo } from '@/modules/fetchCompanies';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { getCompanyUpdate } from '@/modules/fetchCompanies';
import Image from 'next/image';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

const CompanyDetailEmployer = ({ res }) => {
  const [company, setCompany] = useState(res);
  const jobs = company.Jobs;
  const sector = company.Sector;
  const [searchTerm, setSearchTerm] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  const router = useRouter();
  const [isUpload, setIsUpload] = useState(false);
  const [isLogo, setIsLogo] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const diffForHumans = (date) => {
    const now = new Date();
    const newDate = new Date(date);
    const diffInMs = Math.abs(now - newDate);
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'today';
    } else if (diffInDays === 1) {
      return 'yesterday';
    } else {
      return `${diffInDays} days ago`;
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredJobs = jobs.filter((job) => {
    return job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.location.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDelete = async () => {
    try {
      const response = await deleteCompany(company.id);
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
      router.push('http://localhost:3000/employer/companies');
      setIsModalOpen(false);
    } catch (error) {
      setIsModalOpen(false);
      console.log(error);
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
    } finally {
      setIsDelete(false);
    }
  };

  const handleUpdate = () => {
    router.push(`http://localhost:3000/employer/companies/edit/${company.id}`);
  };

  const onSubmit = async (data) => {
    try {
      const response = await updateLogo(data, company.id);
      setIsLogo(false);
      const fetchNewCompany = await getCompanyUpdate(company.id);
      setCompany(fetchNewCompany);
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
    } catch (error) {
      console.error(error);
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
    }
  };

  return (
    <>
      <div className="mt-[22px] pb-9">
        <div className="mx-6">
          <div className="rounded-lg overflow-hidden border border-slate-200">
            <div className="bg-blue-700 p-4 flex justify-between items-center">
              <p className="text-lg text-white ml-3">PROFILE</p>
              <div>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded mr-2"
                  onClick={() => {
                    setIsLogo(true);
                    setIsUpload(false);
                  }}
                >
                  Upload
                </button>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded mr-2" onClick={handleUpdate}>
                  Edit Company
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded"
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 justify-items-center md:justify-items-start lg:grid-cols-4 gap-5 bg-white px-8 py-8">
              {isLogo == true && (
                <div className="col-span-4 items-center mx-auto w-full">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid items-center">
                      <label htmlFor="photo" className="mr-2 basis-36">
                        Company Logo<span className="required text-red-600 text-lg">*</span>
                      </label>
                      <input
                        required
                        accept=".jpg, .png"
                        className="basis-1/2 border border-gray-300 px-2 py-2 rounded-md"
                        type="file"
                        id="logo"
                        name="logo"
                        {...register('logo', { required: true })}
                      ></input>
                      <div className="flex justify-center text-center space-x-2 pt-4">
                        <button className="bg-blue-500 p-2 px-6 rounded-md font-semibold text-white border border-slate-300 hover:border-blue-700" type="submit">
                          Update
                        </button>
                        <button
                          className="bg-white p-2 px-4 rounded-md font-semibold text-blue-500 border border-slate-300 hover:border-blue-500"
                          onClick={() => {
                            setIsLogo(false);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              {!isLogo && (
                <div className="col-span-1 lg:col-span-3 order-last lg:order-first flex flex-col">
                  <div>
                    <p className="text-3xl font-bold">{company.company_name}</p>
                    <p className="text-gray-600 text-sm mb-4">Registered {diffForHumans(company.createdAt)}</p>
                    <p className="text-gray-800 mb-5">{company.description}</p>
                  </div>
                  <div className="flex flex-row flex-wrap justify-start">
                    <div className="basis-auto mr-4 mb-4">
                      <p className="text-gray-600 uppercase">Office Address</p>
                      <p className="text-blue-700">{company.address}</p>
                    </div>
                    <div className="basis-auto mr-4 mb-4">
                      <p className="text-gray-600 uppercase">Sector</p>
                      <p className="text-blue-700">{sector.sector}</p>
                    </div>
                    <div className="basis-auto mr-4 mb-4">
                      <p className="text-gray-600 uppercase">Website</p>
                      <p className="text-blue-700">{company.website}</p>
                    </div>
                    <div className="basis-auto mr-4 mb-4">
                      <p className="text-gray-600 uppercase">PIC</p>
                      <p className="text-blue-700">{company.User.name}</p>
                    </div>
                  </div>
                </div>
              )}
              {!isLogo && (
                <div className="col-span-1 lg:col-span-1 self-center border rounded-lg p-4">
                  {company.logo != null && <Image loader={() => company.logo} className="object-center" src={company.logo} alt="Company Logo" width={180} height={180} />}
                  {company.logo == null && <Image className="object-center" src="/img/blank-pp.jpg" alt="Company Logo" width={180} height={180} />}
                </div>
              )}
            </div>
          </div>
          <div className="rounded-lg overflow-hidden border border-slate-200 mt-3">
            <div className="bg-blue-700 p-4 flex justify-between items-center">
              <p className="text-lg text-white ml-3">JOB OPENING IN COMPANY</p>
              <input className="w-72 rounded-md py-2 pl-2" type="text" placeholder="Find job in company..." onChange={handleSearch}></input>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 bg-white px-8 py-8">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <>
                    <div key={job.id} className="bg-white rounded-lg border-slate-200 border p-6 flex items-center justify-between">
                      <div className="flex items-center">
                        {company.logo != null && <Image loader={() => company.logo} className="mr-4 object-cover object-center" src={company.logo} alt="Alternative text" width={60} height={60} />}
                        {company.logo == null && <Image className="mr-4 object-cover object-center" src="/img/blank-pp.jpg" alt="Alternative text" width={60} height={60} />}
                        <div>
                          <Link href={`/employer/job/${job.id}`}>
                            <h2 className="text-lg font-semibold text-black hover:text-blue-900">{job.title}</h2>
                          </Link>
                          <p className="text-blue-500">{company.company_name}</p>
                          <p className="text-gray-500 text-sm mb-3">
                            {job.location} &#x2022; {job.type}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {job.status === '1' ? <span className="text-green-500">Active</span> : <span className="text-red-500">Inactive</span>} &#x2022; Posted {diffForHumans(job.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <p>No job found</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Confirmation */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal" overlayClassName="modal-overlay">
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-20 transition-opacity" />
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex items-center">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                        CONFIRMATION
                      </h3>
                      <div className="">
                        <p className="text-sm text-gray-500">Are you sure you want to proceed? This data will be removed. This action cannot be undone.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default CompanyDetailEmployer;
