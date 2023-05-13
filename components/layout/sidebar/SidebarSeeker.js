import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { RiBookmarkFill, RiTeamFill, RiBuilding4Fill } from 'react-icons/ri';
import { AiOutlineAppstore, AiOutlineSearch } from 'react-icons/ai';

const SidebarSeeker = () => {
  return (
    <>
      <Link href={'/seeker/job'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <AiOutlineSearch size={20} />
        Job
      </Link>
      <Link href={'/seeker/company'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <RiBuilding4Fill size={20} />
        Company
      </Link>
      <Link href={'/seeker/employer'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <RiTeamFill size={20} />
        Employer
      </Link>
      <Link href={'/seeker/profile'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <CgProfile size={20} />
        Profile
      </Link>
      <Link href={'/seeker/application'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <AiOutlineAppstore size={20} />
        Applications
      </Link>
      <Link href={'/seeker/bookmark'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <RiBookmarkFill size={20} />
        Bookmark
      </Link>
    </>
  );
};

export default SidebarSeeker;
