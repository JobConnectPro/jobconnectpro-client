import { AiOutlineSearch } from 'react-icons/ai';

export default function SearchBar() {
  return (
    <div className="w-full bg-blue-400 sticky top-16">
      <div className="px-4 ">
        <div className="grid grid-cols-2 py-4 gap-2 border-b border-slate-200">
          <form>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
          <div>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option defaultValue>Location</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
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
