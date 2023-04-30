import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { AiOutlineSearch, AiOutlineAppstore, AiOutlineMessage } from "react-icons/ai";

export default function Sidebar() {
  return (
    <div className="flex ">
      <div className="h-full w-48 fixed top-[65px] bg-white p-4 pr-10 border-r border-slate-200 flex">
        <nav className="flex flex-col gap-4">
          <Link href={"/job-board"} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
            <AiOutlineSearch size={20} />
            Job Board
          </Link>
          <Link href={"/profile"} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
            <CgProfile size={20} />
            Profile
          </Link>
          <Link href={"/applications"} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
            <AiOutlineAppstore size={20} />
            Applications
          </Link>
          <Link href={"/messages"} className="flex gap-2 items-center cursor-pointer hover:text-blue-700">
            <AiOutlineMessage size={20} />
            Messages
          </Link>
        </nav>
      </div>
    </div>
  );
}
