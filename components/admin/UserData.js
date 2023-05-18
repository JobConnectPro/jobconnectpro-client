import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getUser } from '@/modules/fetchUser';
// import TableData from "../Tabledatauser/Table";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // console.log(searchQuery);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await getUser(searchQuery, currentPage, perPage);
        setUsers(res.data);
        setTotalPages(res.totalPages);
        console.log(res);
      };
      fetchData([searchQuery, currentPage, perPage]);
    } catch (error) {
      console.log(error);
    }
  }, [searchQuery, currentPage, perPage]);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`border px-4 py-2 rounded ${
            i === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700'
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return <div className="flex items-center justify-center mt-4">{pages}</div>;
  };

  const setBirtday = (params) => {
    const date = new Date(params);
    const birthday = date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return birthday;
  };

  return (
    <div className="w-full p-4">
      {/* {JSON.stringify(users)} */}
      <div className="flex justify-between">
        <form>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none"></div>
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              id="default-search"
              className="block  px-3 py-2 text-gray-900 rounded-lg "
              placeholder="Search user by name"
              required
            />
          </div>
        </form>

        <div>
          <h1 className=" mb-4 text-lg mx-auto text-center text-blue-700 p-1 border-2 border-blue-500 rounded-md">
            All Data Users
          </h1>
        </div>
        <div className="">
          <div className="flex justify-between mb-4">
            <div className="flex items-center mr-2">
              <span>Per page:</span>
              <select
                className="mx-2 border p-1"
                value={perPage}
                onChange={handlePerPageChange}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400s ">
          <thead className="h-10 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th className="px-6 py-3 ">Name</th>
              <th className="px-6 py-3 ">Email</th>
              <th className="px-6 py-3  ">Role</th>
              <th className="px-6 py-3 ">Birthday</th>
              <th className="px-6 py-3 ">Gender</th>
              <th className="px-6 py-3 ">Phone</th>
              <th className="px-6 py-3  ">Address</th>
            </tr>
          </thead>
          <tbody className=" ">
            {users.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 "
              >
                <td className="px-6 py-3  ">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3  ">{user.role}</td>
                <td className="px-6 py-3  ">{setBirtday(user.birthday)}</td>
                <td className="px-6 py-3 ">{user.gender}</td>
                <td className="px-6 py-3  ">{user.phone}</td>
                <td className="px-6 py-3 ">{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">{renderPagination()}</div>
    </div>
  );
};
export default UserList;
