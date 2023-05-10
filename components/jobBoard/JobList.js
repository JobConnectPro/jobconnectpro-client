import React, { useEffect, Fragment } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Logo from '../Logo';
import { CgProfile } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import {
  AiOutlineSearch,
  AiOutlineAppstore,
  AiOutlineMessage,
} from 'react-icons/ai';
import {
  RiArrowDropDownLine,
  RiLogoutBoxRLine,
  RiSettings4Line,
} from 'react-icons/ri';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Cookies from 'js-cookie';
import { RiLogoutBoxLine } from 'react-icons/ri';
import axios from 'axios';
import Profile from '@/pages/admin/profile';

const JobList = () => {
  const [joblist, setJoblist] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/jobs', {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setJoblist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(joblist);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <>
      <div className="flex max-h-full sticky top-20 z-50 ">
        <div className=" w-1/3 overflow-y-scroll sticky top-20 z-50 ">
          <div className="p-4 flex flex-col sticky top-20 z-50 border border-gray-400 bg-gray-400 w-auto ">
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="flex items-center  text-sm font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                  <span className="sr-only">Open user menu</span>
                  <p>Sort</p>
                  <RiArrowDropDownLine size={30} />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/seeker/profile"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        <div className="flex">
                          <p className=" ml-2">Profile</p>
                        </div>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        <div className="flex">
                          <p className=" ml-2">Setting</p>
                        </div>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                        onClick={() => {
                          Cookies.remove('token');
                          Cookies.remove('role');
                        }}
                      >
                        <div className="flex">
                          <p className=" ml-2">Sign out</p>
                        </div>
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <ul className=" flex-1 rounded  border border-gray-200">
            {joblist !== null &&
              joblist.map((joblist) => {
                return (
                  <li className=" cursor-pointer border">
                    <Link
                      href="/list-job"
                      className="flex flex-col p-6 mx-1 overflow-hidden bg-white shadow-lg  w-full h-80  dark:bg-gray-800 "
                    >
                      <div className="flex flex-col items-center justify-between md:flex-row">
                        <div className="flex items-center justify-start flex-grow w-full">
                          <div className="relative block w-full h-full">
                            <img
                              alt="profil"
                              src="https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-logo/a21d73ef67475ff6a2577e22cee992f5.png"
                              className="object-cover mx-auto w-full max-h-30 "
                            />
                          </div>
                        </div>
                      </div>
                      <p className="pt-4 text-lg font-medium text-indigo-500 ">
                        {joblist.title}
                      </p>
                      <p className="text-base text-gray-800 dark:text-white">
                        {joblist.job_level}
                      </p>
                      <p className="text-sm font-normal text-gray-400 grow">
                        {joblist.Company.company_name}
                      </p>
                      <div className="flex flex-wrap items-center justify-start mt-4">
                        <div className="px-4 py-2 mr-2 text-xs text-gray-600 bg-blue-100 rounded-2xl">
                          {joblist.type}
                        </div>
                        <div className="px-4 py-2 text-xs text-gray-600 bg-blue-100 rounded-2xl">
                          {joblist.location}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>

        <div className=" w-2/3">
          <div className="p-6"></div>
        </div>
      </div>
    </>
  );
};

export default JobList;
