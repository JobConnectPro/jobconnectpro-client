import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar() {
  return (
    <div className="w-full bg-blue-400">
      <div className="px-4 ">
        <div className="grid grid-cols-2 py-4 gap-2 border-b border-slate-200">
          <input
            type="text"
            placeholder="Search.."
            className="flex flex-col w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Search.."
            className="flex flex-col w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="grid px-4 grid-cols-7 text-center items-center font-semibold">
        <a className="py-6 hover:bg-blue-500">Job Level</a>
        <a className="py-6 hover:bg-blue-500">Employment</a>
        <a className="py-6 hover:bg-blue-500">Job Function</a>
        <a className="py-6 hover:bg-blue-500">Education</a>
        <a className="py-6 hover:bg-blue-500">Company</a>
        <a className="py-6 hover:bg-blue-500">Salary</a>
        <a className="py-6 hover:bg-blue-500">Restponds Fast</a>
      </div>
    </div>
  );
}
