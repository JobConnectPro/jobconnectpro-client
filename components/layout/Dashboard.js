import React, { useEffect, Fragment } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Logo from '../Logo';
import { CgProfile } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { AiOutlineSearch, AiOutlineAppstore, AiOutlineMessage } from 'react-icons/ai';
import { RiArrowDropDownLine, RiLogoutBoxRLine, RiSettings4Line, RiBookmarkFill } from 'react-icons/ri';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Cookies from 'js-cookie';
import { RiLogoutBoxLine } from 'react-icons/ri';
import axios from 'axios';
import Profile from '@/pages/admin/profile';

const Dashboard = ({ children }) => {
  const [role, setRole] = useState('');
  const [isHide, setIsHide] = useState(false);
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    setRole(Cookies.get('role'));
  }, [role]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/users/profile', {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setProfile({ ...res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <>
      <div className="flex flex-col bg-slate-200">
        {/* navbar */}
        <div className="w-full fixed bg-white">
          <div className="flex justify-between items-center p-4">
            <div className="flex flex-row items-center">
              <span className="mr-3 mt-2">
                <button
                  onClick={() => {
                    if (isHide) {
                      setIsHide(false);
                    } else {
                      setIsHide(true);
                    }
                  }}
                >
                  <GiHamburgerMenu size={20} />
                </button>
              </span>
              <Logo />
            </div>
            <div>
              <ul className="flex items-center gap-6 text-slate-600">
                <li className="cursor-pointer hover:text-blue-700">
                  <AiOutlineMessage size={30} />
                </li>
                <li className="cursor-pointer hover:text-blue-700">
                  <IoMdNotificationsOutline size={30} />
                </li>
                <li className="cursor-pointer hover:text-blue-700">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex items-center  text-sm font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <p>{!profile.name !== null && profile.name?.split(' ')[0]}</p>
                        <RiArrowDropDownLine size={30} />
                        {/* <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        /> */}
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
                            <Link href="/seeker/profile" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                              <div className="flex">
                                <CgProfile size={20} />
                                <p className=" ml-2">Profile</p>
                              </div>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="#" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                              <div className="flex">
                                <RiSettings4Line size={20} />
                                <p className=" ml-2">Setting</p>
                              </div>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              onClick={() => {
                                Cookies.remove('token');
                                Cookies.remove('role');
                              }}
                            >
                              <div className="flex">
                                <RiLogoutBoxRLine size={20} />
                                <p className=" ml-2">Sign out</p>
                              </div>
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* end of navbar */}
        <div className="flex flex-row flex-nowrap">
          {/* sidebar */}
          <div className={isHide ? 'hidden' : 'h-screen basis-auto fixed flex mt-[4rem] bg-white p-4 pr-10'}>
            <nav className="flex flex-col gap-4">
              <Link href={'/job-board'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
                <AiOutlineSearch size={20} />
                Job Board
              </Link>
              {/* admin */}
              {role == 'Admin' && (
                <Link href={'/admin/profile'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
                  <CgProfile size={20} />
                  Profile
                </Link>
              )}
              {role == 'Admin' && (
                <Link href={'/master/attainment'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
                  <CgProfile size={20} />
                  Attainment
                </Link>
              )}
              {role == 'Admin' && (
                <Link href={'/master/category'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
                  <CgProfile size={20} />
                  Category
                </Link>
              )}
              {role == 'Admin' && (
                <Link href={'/master/sector'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
                  <CgProfile size={20} />
                  Sector
                </Link>
              )}
              {role == 'Admin' && (
                <Link href={'/master/skill'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
                  <CgProfile size={20} />
                  Skill
                </Link>
              )}
              {/* end of admin */}

              {/* employer */}
              {role == 'Employer' && (
                <Link href={'/employer/profile'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
                  <CgProfile size={20} />
                  Profile
                </Link>
              )}
              {/* end of employer */}

              {/* seeker */}
              {role == 'Seeker' && (
                <Link href={'/seeker/profile'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
                  <CgProfile size={20} />
                  Profile
                </Link>
              )}
              {role == 'Seeker' && (
                <Link href={'/seeker/applications'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
                  <AiOutlineAppstore size={20} />
                  Applications
                </Link>
              )}
              {role == 'Seeker' && (
                <Link href={'/seeker/bookmarks'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
                  <RiBookmarkFill size={20} />
                  Bookmark
                </Link>
              )}
              {/* end of seeker */}

              <Link href={'/messages'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
                <AiOutlineMessage size={20} />
                Messages
              </Link>
            </nav>
          </div>
          {/* end of sidebar */}
          {/* main content */}
          <div className={isHide ? 'basis-full ml-0' : 'basis-full ml-44'}>{children}</div>
          {/* main content */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
