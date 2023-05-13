import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineSearch } from 'react-icons/ai';
import { RiBookmarkFill, RiTeamFill, RiBuilding4Fill } from 'react-icons/ri';

const SidebarEmployer = () => {
  return (
    <>
      <Link href={'/employer/companies'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <RiBuilding4Fill size={20} />
        My Company
      </Link>
      <Link href={'/employer/job'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <AiOutlineSearch size={20} />
        My Job
      </Link>
      <Link href={'/employer/profile'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <CgProfile size={20} />
        Profile
      </Link>
    </>
  );
};

export default SidebarEmployer;
