import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';

const SidebarEmployer = () => {
  return (
    <>
      <Link href={'/employer/profile'} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
        <CgProfile size={20} />
        Profile
      </Link>
    </>
  );
};

export default SidebarEmployer;
