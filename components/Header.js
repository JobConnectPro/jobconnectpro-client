import React from 'react';
import Logo from '../components/Logo';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="w-full sticky top-0 z-30 px-4 bg-white border-gray-200 ">
      <div className="py-4 flex justify-between items-center">
        <div className="">
          <Logo />
        </div>
        <div className="">
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
        </div>
      </div>
    </div>
  );
}
