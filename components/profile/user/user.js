import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UserList = () => {
    const [Users, setUsers] = useState([]);
    useEffect(() => {
     axios
     .get(`http://localhost:8000/users`,{
        headers: { authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        setUsers([...res.data.data]);
      })
      .catch((error) => {
        console.log(error);
      });
      },[]);

      return (
        <div className="w-full p-8 mt-10 ">
        <div className="w-1/2 mx-auto p-4">
            <table class="w-full table-auto shadow-lg bg-white">
            <caption class="caption-top text-2xl text-center text-blue-700">USER DATA</caption>
              <thead>
                <tr className="justify-content">
                  <th className = "bg-blue-100 border text-left px-8 py-4">name</th>
                  <th className = "bg-blue-100 border text-left px-8 py-4">email</th>
                  <th className = "bg-blue-100 border text-left px-8 py-4">password</th>
                  <th className = "bg-blue-100 border text-left px-8 py-4">role</th>
                  <th className = "bg-blue-100 border text-left px-8 py-4">birthday</th>
                  <th className = "bg-blue-100 border text-left px-8 py-4">gender</th>
                  <th className = "bg-blue-100 border text-left px-8 py-4">phone</th>
                  <th className = "bg-blue-100 border text-left px-8 py-4">address</th>
                  <th className = "bg-blue-100 border text-left px-8 py-4">summary</th>
                  <th className = "bg-blue-100 border text-left px-8 py-4">salary_expactation</th>
                  <th className = "bg-blue-100 border text-left px-8 py-4">photo</th>
                  <th className = "bg-blue-100 border text-left px-8 py-4">resume</th>  
                </tr>
              </thead>
              <tbody>
                {Users.map((User, index) => (
                  <tr key={index}>
                      <td className = "border px-8 py-4">{User.name}</td>
                      <td className = "border px-8 py-4">{User.email}</td>
                      <td className = "border px-8 py-4">{User.password}</td>
                      <td className = "border px-8 py-4">{User.role}</td>
                      <td className = "border px-8 py-4">{User.birthday}</td>
                      <td className = "border px-8 py-4">{User.gender}</td>
                      <td className = "border px-8 py-4">{User.phone}</td>
                      <td className = "border px-8 py-4">{User.address}</td>
                      <td className = "border px-8 py-4">{User.summary}</td>
                      <td className = "border px-8 py-4">{User.salary_expactation}</td>
                      <td className = "border px-8 py-4">{User.photo}</td>
                      <td className = "border px-8 py-4">{User.resume}</td>
                  </tr> 
      ))}
              </tbody>
            </table>
        </div>
      </div>
      );
};
export default UserList;