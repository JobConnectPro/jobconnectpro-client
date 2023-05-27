import Link from "next/link";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineSearch } from "react-icons/ai";
import { RiBookmarkFill, RiTeamFill, RiBuilding4Fill, RiBriefcaseFill, RiUser6Fill } from "react-icons/ri";

const SidebarEmployer = () => {
  const [activeLink, setActiveLink] = useState(null);
  const activeClass = "font-semibold text-blue-700 border-r-2 border-blue-700";
  const normalClass = "";

  const handleClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <Link href={"/employer/companies"}>
        <div
          className={`flex gap-3 items-center cursor-pointer hover:font-semibold hover:text-blue-700 hover:border-r-2 border-blue-700 ${
            activeLink === "/employer/companies" ? activeClass : normalClass
          }`}
          onClick={() => handleClick("/employer/companies")}
        >
          <RiBuilding4Fill size={25} />
          My Company
        </div>
      </Link>

      <Link href={"/employer/job"}>
        <div
          className={`flex gap-3 items-center cursor-pointer hover:font-semibold hover:text-blue-700 hover:border-r-2 border-blue-700 ${
            activeLink === "/employer/job" ? activeClass : normalClass
          }`}
          onClick={() => handleClick("/employer/job")}
        >
          <RiBriefcaseFill className="" size={25} />
          My Job
        </div>
      </Link>
      <Link href={"/employer/profile"}>
        <div
          className={`flex gap-3 items-center cursor-pointer hover:font-semibold hover:text-blue-700 hover:border-r-2 border-blue-700 ${
            activeLink === "/employer/profile" ? activeClass : normalClass
          }`}
          onClick={() => handleClick("/employer/profile")}
        >
          <RiUser6Fill className="" size={25} />
          Profile
        </div>
      </Link>
    </>
  );
};

export default SidebarEmployer;
