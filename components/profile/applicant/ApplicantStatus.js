BsFillMortarboardFill;
import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import { getApplicant } from '@/modules/fetch';
import { BsFillMortarboardFill } from 'react-icons/bs';
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
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex">
            <BsFillMortarboardFill size={30} />
            <p className="ml-2 text-lg">Application Status</p>
          </div>
        </div>
        <div className="px-6 pt-4 pb-2">
          {!isEdit && (
            <div className="inline-block align-middle">
              {applicant.UserApplication?.map((application) => {
                return (
                  <Fragment key={application.id}>
                    <div>
                      <p className="font-bold text-blue-700 text-xl">{application.Application.status}</p>
                      <p className="text-gray-700 text-base mb-8">{application.Application.description}</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsEdit(true);
                        setInput({
                          status: application.Application.status,
                          description: application.Application.description,
                        });
                      }}
                      className="bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded mb-5"
                    >
                      Edit Application Status
                    </button>
                  </Fragment>
                );
              })}
            </div>
          )}
          {isEdit && (
            <div>
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="grid items-center mx-auto">
                  <label htmlFor="status" className="mr-2 basis-36">
                    Status<span className="required text-red-600 text-lg">*</span>
                  </label>
                  <select id="status" name="status" value={input.status} onChange={handleChange} className="basis-1/2 border border-gray-300 rounded-md py-3 pl-1 pr-3" required>
                    <option value="">--Select an option--</option>
                    <option value="Application being reviewed">Application being reviewed</option>
                    <option value="For Interview">For Interview</option>
                    <option value="You requested for a reschedule">You requested for a reschedule</option>
                    <option value="You declined the interview">You declined the interview</option>
                    <option value="Application rejected">Application rejected</option>
                  </select>
                </div>
                <div className="grid items-center mx-auto">
                  <label htmlFor="description" className="mr-2 basis-36">
                    Description<span className="required text-red-600 text-lg">*</span>
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
                  <div className="flex justify-center text-center space-x-2 pt-4 py-4">
                    <button
                      onClick={() => {
                        setIsEdit(false);
                        setInput({
                          status: '',
                          description: '',
                        });
                      }}
                      className="bg-white p-2 px-4 rounded-md font-semibold text-blue-500 border border-slate-300 hover:border-blue-500"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="bg-blue-500 p-2 px-6 rounded-md font-semibold text-white border border-slate-300 hover:border-blue-700">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <div>
        <div>{!isEdit && <div className="flex flex-row flex-wrap justify-center items-center gap-2"></div>}</div>
      </div>
    </>
  );
};

export default ApplicantStatus;
