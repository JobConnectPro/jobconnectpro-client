import Link from 'next/link';
import { CgProfile, CgDuplicate } from 'react-icons/cg';
import { RiTeamFill, RiBuilding4Fill, RiAwardLine, RiPaletteLine } from 'react-icons/ri';

const SidebarAdmin = () => {
  return (
    <>
      <Link href={'/admin/profile'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <CgProfile size={20} />
        Profile
      </Link>
      <Link href={'/admin/master/attainment'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <RiAwardLine size={20} />
        Attainment
      </Link>
      <Link href={'/admin/master/category'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <CgDuplicate size={20} />
        Category
      </Link>
      <Link href={'/admin/master/sector'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <RiBuilding4Fill size={20} />
        Sector
      </Link>
      <Link href={'/admin/master/skill'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <RiPaletteLine size={20} />
        Skill
      </Link>
      <Link href={'/admin/master/user'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <RiTeamFill size={20} />
        User
      </Link>
    </>
  );
};

export default SidebarAdmin;
