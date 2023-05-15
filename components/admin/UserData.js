import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import TableData from "../Tabledatauser/Table";

const UserList = () => {
  const [Users, setUsers] = useState([]);
  console.log(Users);
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
  const dataUser = React.useMemo(() => [...Users], [Users]);
  const columnFunction = () => [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Role",
      accessor: "role",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
    {
      Header: "Address",
      accessor: "address",
    },
  ];
  const columns = React.useMemo(columnFunction, []);
  return (
    <div className="w-full p-4 py-8">
      <TableData columns={columns} data={dataUser}></TableData>
    </div>
  );
};
export default UserList;
