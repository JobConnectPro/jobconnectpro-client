import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';

const SidebarAdmin = () => {
  return (
    <>
      <Link href={'/admin/profile'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <CgProfile size={20} />
        Profile
      </Link>
      <Link href={'/admin/master/attainment'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <CgProfile size={20} />
        Attainment
      </Link>
      <Link href={'/admin/master/category'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <CgProfile size={20} />
        Category
      </Link>
      <Link href={'/admin/master/sector'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <CgProfile size={20} />
        Sector
      </Link>
      <Link href={'/admin/master/skill'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <CgProfile size={20} />
        Skill
      </Link>
    </>
  );
};

export default SidebarAdmin;
