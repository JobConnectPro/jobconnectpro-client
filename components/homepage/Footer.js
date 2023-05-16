import React from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';
import Logo from '../Logo';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="w-full pt-24 pb-20 px-8 bg-slate-200 mx-auto   text-gray-500">
      <div className="mb-9">
        <Logo />
      </div>

      <div className="flex justify-between flex-wrap mt-5">
        <div className="flex flex-col flex-1 ">
          <p className=" font-bold text-2xl leading-10 text-black">
            The best way <br></br> to candidates find jobs and <br></br>
            companies to hire talents
          </p>
          <div className="flex justify-between md:w-[50%] mt-6">
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
            <FaGithubSquare size={30} />
            <FaDribbbleSquare size={30} />
          </div>
        </div>
        <div className="flex flex-wrap flex-1  ">
          <div className="flex-1">
            <h3 className="font-bold text-blue-500 mb-6 text-lg">Candidates</h3>
            <ul className="text-black">
              <Link href="/signup/seeker">
                <li className="text-base hover:text-blue-500">Sign Up</li>
              </Link>
              <Link href="/job-board">
                <li className="text-base mt-3 hover:text-blue-500">
                  Job Board
                </li>
              </Link>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-blue-500 mb-6">Employers</h3>
            <ul className="text-black">
              <Link href="#">
                <li className="text-base  hover:text-blue-500">Start Hiring</li>
              </Link>
              <Link href="#">
                <li className="text-base mt-3  hover:text-blue-500">
                  Employer Branding
                </li>
              </Link>
              <Link href="#">
                <li className="text-base mt-3  hover:text-blue-500">Blog</li>
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
                <li className="text-base mt-3  hover:text-blue-500">
                  Contact Us
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
