import React from "react";
import { FaDribbbleSquare, FaFacebookSquare, FaGithubSquare, FaInstagram, FaTwitterSquare } from "react-icons/fa";
import Logo from "../Logo";

const Footer = () => {
  return (
    <div className="w-full p-4 bg-slate-200 mx-auto py-8 grid lg:grid-cols-3 gap-24 text-gray-500">
      <div>
        <Logo />
        <p className="py-5">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id odit ullam iste repellat consequatur libero
          reiciendis, blanditiis accusantium.
        </p>
        <div className="flex justify-between md:w-[75%]">
          <FaFacebookSquare size={30} />
          <FaInstagram size={30} />
          <FaTwitterSquare size={30} />
          <FaGithubSquare size={30} />
          <FaDribbbleSquare size={30} />
        </div>
      </div>
      <div className="lg:col-span-2 flex justify-between mt-5">
        <div>
          <h6 className="font-medium text-gray-400">Candidates</h6>
          <ul>
            <li className="py-2 text-sm">Sign UP</li>
            <li className="text-sm">Job Board</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Employers</h6>
          <ul>
            <li className="py-2 text-sm">Start Hiring</li>
            <li className="text-sm">Employer Brnding</li>
            <li className="py-2 text-sm">Blog</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">About</h6>
          <ul>
            <li className="py-2 text-sm">About</li>
            <li className="text-sm">Careers</li>
            <li className="py-2 text-sm">Contac Us</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
