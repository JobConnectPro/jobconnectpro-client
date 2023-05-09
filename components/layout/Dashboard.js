import React, { useEffect } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Logo from '../Logo';
import { CgProfile } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { AiOutlineSearch, AiOutlineAppstore, AiOutlineMessage } from 'react-icons/ai';
import Cookies from 'js-cookie';

const Dashboard = ({ children }) => {
  const [role, setRole] = useState('');
  const [isHide, setIsHide] = useState(false);

  useEffect(() => {
    setRole(Cookies.get('role'));
  }, [role]);

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
                  <CgProfile size={30} />
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
                  <CgProfile size={20} />
                  Application
                </Link>
              )}
              {role == 'Seeker' && (
                <Link href={'/seeker/bookmarks'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
                  <CgProfile size={20} />
                  Bookmark
                </Link>
              )}
              {/* end of seeker */}

              <Link href={'/applications'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
                <AiOutlineAppstore size={20} />
                Applications
              </Link>
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
