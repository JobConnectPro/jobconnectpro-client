import React, { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function Header() {
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(Cookies.get('token'));
  });

  return (
    <div className="w-full sticky top-0 z-30 px-14 bg-white border-gray-200">
      <div className="py-5 flex justify-between items-center">
        <div className="">
          <Logo />
        </div>
        <div className="">
          {!token && (
            <ul className="flex items-center gap-6 font-semibold text-slate-600">
              <Link href="/signup/seeker">
                <li className="flex cursor-pointer gap-2 p-1 hover:text-blue-700 rounded-md">Jobseeker</li>
              </Link>
              <Link href="/signup/employer">
                <li className="flex cursor-pointer gap-2 p-1 hover:text-blue-700 rounded-md">Employer</li>
              </Link>
              <Link href="/signin">
                <button className="cursor-pointer font-semibold bg-white text-blue-700 border border-blue-700 rounded-md mx-auto py-2 px-4 hover:bg-blue-700 hover:text-white">Sign in</button>
              </Link>
            </ul>
          )}
          {token && (
            <ul className="flex items-center gap-6 font-semibold text-slate-600">
              <Link href="/seeker/profile">
                <li className="flex cursor-pointer gap-2 p-1 hover:text-blue-700 rounded-md">Jobseeker</li>
              </Link>
              <Link href="/employer/profile">
                <li className="flex cursor-pointer gap-2 p-1 hover:text-blue-700 rounded-md">Employer</li>
              </Link>
              <Link href="/">
                <button
                  onClick={() => {
                    Cookies.remove('token');
                    Cookies.remove('role');
                  }}
                  className="cursor-pointer font-semibold bg-white text-blue-700 border border-blue-700 rounded-md mx-auto py-2 px-4 hover:bg-blue-700 hover:text-white"
                >
                  Sign out
                </button>
              </Link>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
