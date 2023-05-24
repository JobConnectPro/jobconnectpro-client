import Link from "next/link";
import { useState } from "react";
import { RiBookmarkFill, RiTeamFill, RiBuilding4Fill, RiBriefcaseFill, RiUser6Fill, RiAppsFill } from "react-icons/ri";

const SidebarSeeker = () => {
  const [activeLink, setActiveLink] = useState(null);
  const activeClass = "font-semibold text-blue-700 border-r-2 border-blue-700";
  const normalClass = "";

  const handleClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <Link href={"/seeker/job"}>
        <div
          className={`flex gap-3 items-center cursor-pointer hover:font-semibold hover:text-blue-700 hover:border-r-2 border-blue-700 ${
            activeLink === "/seeker/job" ? activeClass : normalClass
          }`}
          onClick={() => handleClick("/seeker/job")}
        >
          <RiBriefcaseFill className="bg-gray-300 p-1 rounded-md" size={30} />
          Job
        </div>
      </Link>
      <Link href={"/seeker/companies"}>
        <div
          className={`flex gap-3 items-center cursor-pointer hover:font-semibold hover:text-blue-700 hover:border-r-2 border-blue-700 ${
            activeLink === "/seeker/companies" ? activeClass : normalClass
          }`}
          onClick={() => handleClick("/seeker/companies")}
        >
          <RiBuilding4Fill className="bg-gray-300 p-1 rounded-md" size={30} />
          Company
        </div>
      </Link>
      <Link href={"/seeker/employer"}>
        <div
          className={`flex gap-3 items-center cursor-pointer hover:font-semibold hover:text-blue-700 hover:border-r-2 border-blue-700 ${
            activeLink === "/seeker/employer" ? activeClass : normalClass
          }`}
          onClick={() => handleClick("/seeker/employer")}
        >
          <RiTeamFill className="bg-gray-300 p-1 rounded-md" size={30} />
          Recruiter
        </div>
      </Link>
      <Link href={"/seeker/profile"}>
        <div
          className={`flex gap-3 items-center cursor-pointer hover:font-semibold hover:text-blue-700 hover:border-r-2 border-blue-700 ${
            activeLink === "/seeker/profile" ? activeClass : normalClass
          }`}
          onClick={() => handleClick("/seeker/profile")}
        >
          <RiUser6Fill className="bg-gray-300 p-1 rounded-md" size={30} />
          Profile
        </div>
      </Link>
      <Link href={"/seeker/application"}>
        <div
          className={`flex gap-3 items-center cursor-pointer hover:font-semibold hover:text-blue-700 hover:border-r-2 border-blue-700 ${
            activeLink === "/seeker/application" ? activeClass : normalClass
          }`}
          onClick={() => handleClick("/seeker/application")}
        >
          <RiAppsFill className="bg-gray-300 p-1 rounded-md" size={30} />
          Application
        </div>
      </Link>
      <Link href={"/seeker/bookmark"}>
        <div
          className={`flex gap-3 items-center cursor-pointer hover:font-semibold hover:text-blue-700 hover:border-r-2 border-blue-700 ${
            activeLink === "/seeker/bookmark" ? activeClass : normalClass
          }`}
          onClick={() => handleClick("/seeker/bookmark")}
        >
          <RiBookmarkFill className="bg-gray-300 p-1 rounded-md" size={30} />
          Bookmark
        </div>
      </Link>
    </>
  );
};

export default SidebarSeeker;
