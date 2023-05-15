import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import TableData from "../Tabledatauser/Table";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users`, {
        headers: { authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        setUsers([...res.data.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-full p-4">
      {/* {JSON.stringify(users)} */}
      <h1 className="w-1/4 mb-4 text-lg mx-auto text-center text-blue-700 p-1 border-2 border-blue-500 rounded-md">
        All Data Users
      </h1>
      <div className="">
        <table class="w-full lg:text-base md:text-sm sm:text-xs ">
          <thead className="h-10 ">
            <tr className="text-left border-b-2 border-slate-600 ">
              <th className="px-4 bg-blue-200 ">Name</th>
              <th className="px-4 bg-blue-100 ">Email</th>
              <th className="px-4 bg-blue-200 ">Role</th>
              <th className="px-4 bg-blue-100 ">Birthday</th>
              <th className="px-4 bg-blue-200 ">Gender</th>
              <th className="px-4 bg-blue-100 ">Phone</th>
              <th className="px-4 bg-blue-200 ">Address</th>
            </tr>
          </thead>
          <tbody className=" ">
            {users.map((user) => (
              <tr key={user.id} className="h-8 border-t border-slate-400 ">
                <td className="px-2 bg-blue-200 ">{user.name}</td>
                <td className="px-2 bg-blue-100 ">{user.email}</td>
                <td className="px-2 bg-blue-200 ">{user.role}</td>
                <td className="px-2 bg-blue-100 ">{user.birthday}</td>
                <td className="px-2 bg-blue-200 ">{user.gender}</td>
                <td className="px-2 bg-blue-100 ">{user.phone}</td>
                <td className="px-2 bg-blue-200 ">{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserList;
