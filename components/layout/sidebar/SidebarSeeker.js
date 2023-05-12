import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { RiBookmarkFill } from 'react-icons/ri';
import { AiOutlineAppstore } from 'react-icons/ai';

const SidebarSeeker = () => {
  return (
    <>
      <Link href={'/seeker/profile'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <CgProfile size={20} />
        Profile
      </Link>
      <Link href={'/seeker/applications'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <AiOutlineAppstore size={20} />
        Applications
      </Link>
      <Link href={'/seeker/bookmarks'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <RiBookmarkFill size={20} />
        Bookmark
      </Link>
    </>
  );
};

export default SidebarSeeker;
