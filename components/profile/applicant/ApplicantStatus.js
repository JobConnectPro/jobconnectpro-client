BsFillMortarboardFill;
import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import { getApplicant } from '@/modules/fetch';
import { BsFillBriefcaseFill, BsFillMortarboardFill } from 'react-icons/bs';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiEdit2Fill, RiAddCircleLine } from 'react-icons/ri';

import Image from 'next/image';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const ApplicantStatus = () => {
  const router = useRouter();
  const applicantId = router.query.applicantid;
  const jobId = router.query.id;
  const [applicant, setApplicant] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [input, setInput] = useState({
    status: '',
    description: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getApplicant(applicantId, jobId);
      setApplicant(res);
    };
    fetchData();
  }, [isEdit]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8000/users/${applicantId}/job/${jobId}`, input, {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        toast.success(res.data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setIsEdit(false);
        setInput({
          status: '',
          description: '',
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
  };

  return (
    <>
      <div>
        <div className="flex mt-5">
          <BsFillMortarboardFill size={30} />
          <p className="ml-2 text-lg">Application Status</p>
        </div>
        <div>
          {!isEdit && (
            <div className="flex flex-row flex-wrap justify-center items-center gap-2">
              {applicant.UserApplication?.map((application) => {
                return (
                  <div className="basis-1/4" key={application.id}>
                    <div className="flex flex-row border-solid border-2 border-slate-400 rounded-md p-4">
                      <div className="basis-full">
                        <p className="font-bold text-lg">{application.Application.status}</p>
                        <p className="text-sm text-slate-500">{application.Application.description}</p>
                      </div>
                    </div>
                    {/* edit button */}
                    <button
                      onClick={() => {
                        setIsEdit(true);
                        setInput({
                          status: application.Application.status,
                          description: application.Application.description,
                        });
                      }}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold p-1 rounded-md ml-2"
                    >
                      <RiEdit2Fill size={15} />
                    </button>
                    {/* end of edit button */}
                  </div>
                );
              })}
            </div>
          )}
          {isEdit && (
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="flex items-center mx-auto justify-center">
                <label htmlFor="status" className="mr-2 basis-36">
                  Status:
                </label>
                <select id="status" name="status" value={input.status} onChange={handleChange} className="basis-1/2 border border-gray-300 rounded-md py-2 pl-1 pr-3" required>
                  <option value="">--Select an option--</option>
                  <option value="Application being reviewed">Application being reviewed</option>
                  <option value="For Interview">For Interview</option>
                  <option value="You requested for a reschedule">You requested for a reschedule</option>
                  <option value="You declined the interview">You declined the interview</option>
                  <option value="Application rejected">Application rejected</option>
                </select>
              </div>
              <div className="flex items-center mx-auto justify-center">
                <label htmlFor="description" className="mr-2 basis-36">
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={input.description}
                  onChange={handleChange}
                  className="basis-1/2 border border-gray-300 px-2 py-1 rounded-md w-full"
                  required
                  rows="5"
                />
              </div>
              <div>
                <div className="flex justify-center text-center gap-4">
                  <button
                    onClick={() => {
                      setIsEdit(false);
                      setInput({
                        status: '',
                        description: '',
                      });
                    }}
                    className="my-4 bg-white p-2 px-4 rounded-md font-semibold text-blue-500 border border-slate-300 hover:border-blue-500"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="my-4 bg-blue-500 p-2 px-6 rounded-md font-semibold text-white border border-slate-300 hover:border-blue-700">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ApplicantStatus;
