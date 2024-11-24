import { memo, useEffect, useState } from "react";
import axios from "../../config/configAxios";
import { Table } from "flowbite-react";
const User = memo(() => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/user");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex text-2xl font-bold mt-4 mb-10 mx-auto !important">
        Danh sách thành viên
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <ListUser users={users} />
        </Table.Body>
      </Table>
    </div>
  );
});
const ListUser = memo(({ users, openModal }) => {
  return users?.map((user) => (
    <Table.Row
      key={user.id}
      className="bg-white dark:bor{}er-gray-700 dark:bg-gray-800"
    >
      <Table.Cell>{user.id}</Table.Cell>
      <Table.Cell className=" font-medium text-gray-900 dark:text-white ">
        {user.name}
      </Table.Cell>
    </Table.Row>
  ));
});
export default User;
