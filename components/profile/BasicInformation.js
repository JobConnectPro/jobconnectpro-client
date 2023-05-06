import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiEdit2Fill } from 'react-icons/ri';
export default function BasicInformation({ userProfile }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [profile, setProfile] = useState({ ...userProfile });
  const [input, setInput] = useState({
    name: '',
    birthday: '',
    gender: '',
    phone: '',
    address: '',
  });
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = () => {};
  const handleSubmit = () => {};

  return (
    <div className="w-screen p-4 pt-20 pl-52">
      <button onClick={toggle} className="w-full flex items-center justify-between p-2 bg-blue-500 hover:bg-blue-600">
        Basic Information
        <div>{isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
      </button>
      <div className={isOpen ? 'hidden' : 'w-full'}>
        {/* code here */}
        <div className="flex flex-row flex-wrap justify-start items-center h-48">
          {!isEdit && (
            <>
              <div className="basis-1/4">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
                  <Image loader={() => profile.photo} className="w-full h-full object-cover object-center" src={profile.photo} alt="Alternative text" width={100} height={100} />
                </div>
              </div>
              <div className="basis-1/4">
                {/* <RiProfileFill size={40} /> */}
                <p>{profile.name}</p>
                <p>{profile.email}</p>
                <p>{profile.gender}</p>
              </div>
              <div className="basis-1/4">
                {/* <RiProfileFill size={40} /> */}
                <p>{profile.phone}</p>
                <p>{profile.birthday}</p>
                <p>{profile.address}</p>
              </div>
              <div className="basis-1/4">
                {!isEdit && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setIsEdit(true);
                      }}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold p-1 rounded-md"
                    >
                      <RiEdit2Fill size={20} />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          {isEdit && (
            <>
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-3" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        name="name"
                        type="input"
                        autoComplete="name"
                        value={input.name}
                        onChange={handleChange}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="birthday" className="block text-sm font-medium leading-6 text-gray-900">
                      birthday
                    </label>
                    <div className="mt-2">
                      <input
                        id="birthday"
                        name="birthday"
                        type="date"
                        autoComplete="birthday"
                        required
                        value={input.birthday}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="birthday" className="block text-sm font-medium leading-6 text-gray-900">
                      gender
                    </label>
                    <div className="mt-2">
                      <select id="option-select" name="gender" value={input.gender} onChange={handleChange}>
                        <option value="">--Select an option--</option>
                        <option value="man">Man</option>
                        <option value="woman">Woman</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                      phone
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        name="phone"
                        type="input"
                        autoComplete="phone"
                        required
                        value={input.phone}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                      address
                    </label>
                    <div className="mt-2">
                      <input
                        id="address"
                        name="address"
                        type="input"
                        autoComplete="address"
                        required
                        value={input.address}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-center text-center gap-4 bg-slate-200">
          <button className="my-4 bg-white p-2 px-4 rounded-md font-semibold text-blue-500 border border-slate-300 hover:border-blue-500">Cancel</button>
          <button className="my-4 bg-blue-500 p-2 px-6 rounded-md font-semibold text-white border border-slate-300 hover:border-blue-700">Save</button>
        </div>
      </div>
    </div>
  );
}
