import React from "react";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <div className="w-screen">
      <div className="w-full fixed px-4">
        <div className="bg-white py-4 border-b border-gray-200 flex justify-between items-center">
          <div className="">
            <Logo />
          </div>
          <div className="">
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
      {/* <main>{children}</main> */}
    </div>
  );
}
