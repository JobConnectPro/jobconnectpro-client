import Link from "next/link";
import { CgProfile, CgPrinter } from "react-icons/cg";
import { IoSchoolOutline } from "react-icons/io5";
import { FiUser, FiBriefcase } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import { GiSkills } from "react-icons/gi";

const SidebarAdmin = () => {
  return (
    <>
      <Link href={"/admin/profile"} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <FiUser size={20} />
        Profile
      </Link>
      <Link href={"/admin/master/attainment"} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <IoSchoolOutline size={20} />
        Attainment
      </Link>
      <Link href={"/admin/master/category"} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <MdOutlineCategory size={20} />
        Category
      </Link>
      <Link href={"/admin/master/sector"} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <FiBriefcase size={20} />
        Sector
      </Link>
      <Link href={"/admin/master/skill"} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <GiSkills size={20} />
        Skill
      </Link>
    </>
  );
};

export default SidebarAdmin;
