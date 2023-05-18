import React from 'react';
import { FaDribbbleSquare, FaFacebookSquare, FaGithubSquare, FaInstagram, FaTwitterSquare } from 'react-icons/fa';
import Logo from '../Logo';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="w-full pt-16 pb-20 px-14 bg-slate-200  text-gray-500">
      <div className="mb-8">
        <Logo />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="flex flex-col md:col-span-1 lg:col-span-1">
          <p className="text-xl text-black">The best way to candidates find jobs and companies to hire talents</p>
          <div className="flex justify-start space-x-3 mt-6">
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
            <FaGithubSquare size={30} />
            <FaDribbbleSquare size={30} />
          </div>
        </div>
        <div className="md:hidden lg:flex lg:col-span-1"></div>
        <div className="grid grid-cols-3 md:col-span-1 lg:col-span-2">
          <div className="flex-1">
            <h3 className="font-bold text-blue-500 mb-6 text-lg">Jobseeker</h3>
            <ul className="text-black">
              <Link href="/signup/seeker">
                <li className="text-base hover:text-blue-500">Sign Up</li>
              </Link>
              <Link href="/seeker/job">
                <li className="text-base mt-3 hover:text-blue-500">Job Board</li>
              </Link>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-blue-500 mb-6">Employers</h3>
            <ul className="text-black">
              <Link href="/signup/employer">
                <li className="text-base  hover:text-blue-500">Sign Up</li>
              </Link>
              <Link href="/employer/job">
                <li className="text-base mt-3 hover:text-blue-500">Start Hiring</li>
              </Link>
              <Link href="#">
                <li className="text-base mt-3 hover:text-blue-500">Blog</li>
              </Link>
            </ul>
          </div>
          <div className="flex-1">
            <h6 className="font-bold text-blue-500 text-lg mb-6">About</h6>
            <ul className="text-black">
              <Link href="#">
                <li className="text-base  hover:text-blue-500">About</li>
              </Link>
              <Link href="#">
                <li className="text-base mt-3  hover:text-blue-500">Careers</li>
              </Link>
              <Link href="#">
                <li className="text-base mt-3  hover:text-blue-500">Contact Us</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
