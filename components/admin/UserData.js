import React, { useEffect, useState } from 'react';
import { getUser } from '@/modules/fetchUser';
import Loading from '@/components/loading/Loading';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await getUser(searchQuery, currentPage, perPage);
        setUsers(res.data);
        setTotalPages(res.totalPages);
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
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
        <button key={i} className={`border px-4 py-2 rounded ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`} onClick={() => handlePageChange(i)}>
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="mt-[22px] h-screen">
        <h1 className="mx-6 mb-4 text-3xl font-bold">Users</h1>
        <div className="mx-6 rounded-md bg-white border border-slate-200">
          <div className="flex justify-between items-center mx-auto py-3 pl-6 bg-blue-700 text-white text-md font-semibold rounded-t-md">
            <p className="border-white">Users</p>
          </div>
          <div className="relative overflow-x-auto mx-6 my-4">
            <div className="flex flex-row justify-between mb-4">
              <div className="flex items-center mr-2">
                <span>Show:</span>
                <select className="mx-2 border rounded-lg p-1" value={perPage} onChange={handlePerPageChange}>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
              <form>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                  id="default-search"
                  className="block border-gray border text-sm px-3 py-2 text-gray-900 rounded-lg "
                  placeholder="Search user by name...."
                  required
                />
              </form>
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm divide-y text-left divide-gray-200 border">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-sm text-gray-400 uppercase tracking-wider w-[20%]">Name</th>
                    <th className="px-6 py-3 text-left text-sm text-gray-400 uppercase tracking-wider w-[10%]">Email</th>
                    <th className="px-6 py-3 text-left text-sm text-gray-400 uppercase tracking-wider w-[5%]">Role</th>
                    <th className="px-6 py-3 text-left text-sm text-gray-400 uppercase tracking-wider w-[15%]">Birthday</th>
                    <th className="px-6 py-3 text-left text-sm text-gray-400 uppercase tracking-wider w-[5%]">Gender</th>
                    <th className="px-6 py-3 text-left text-sm text-gray-400 uppercase tracking-wider w-[10%]">Phone</th>
                    <th className="px-6 py-3 text-left text-sm text-gray-400 uppercase tracking-wider w-[35%]">Address</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-2">{user.name}</td>
                      <td className="px-6 py-2">{user.email}</td>
                      <td className="px-6 py-2">{user.role}</td>
                      <td className="px-6 py-2">{setBirtday(user.birthday)}</td>
                      <td className="px-6 py-2">{user.gender}</td>
                      <td className="px-6 py-2">{user.phone}</td>
                      <td className="px-6 py-2">{user.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="w-full">
                <div className="flex justify-center">{renderPagination()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserList;
