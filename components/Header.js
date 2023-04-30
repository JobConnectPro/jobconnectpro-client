import React from "react";
import Logo from "../components/Logo";

export default function Header() {
  return (
    <div className="w-screen">
      <div className="w-full fixed px-4">
        <div className="bg-white py-4 border-b border-gray-200 flex justify-between items-center">
          <div className="">
            <Logo />
          </div>
          <div className="">
            <ul className="flex items-center gap-6 font-semibold text-slate-600">
              <li className="flex cursor-pointer gap-2 p-1 hover:bg-slate-100 rounded-md">Jobseeker</li>
              <li className="flex cursor-pointer gap-2 p-1 hover:bg-slate-100 rounded-md">Employer</li>
              <button className="cursor-pointer font-semibold bg-blue-500 text-white rounded-md mx-auto py-2 px-6 hover:bg-blue-700">
                Login
              </button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
