import { Table, Button, Label, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "../../config/configAxios";
const Source = () => {
  const [sources, setSources] = useState([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("/api/source");
        setSources(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchQuestions();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex text-2xl font-bold mt-4 mb-10 mx-auto !important">
        Danh sách các nguồn câu hỏi
      </div>
      <div className="w-full pl-8 flex justify-between ">
        <Button className="">Thêm</Button>
        <div className="flex">
          <Select id="option" required className="">
            <option value={"id"}>ID</option>
            <option value={"link"}>Link</option>
            <option value={"status"}>Status</option>
          </Select>
          <form className="w-full max-w-md mx-auto relative ">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative flex w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="Search ..."
                required
              />
              <button
                type="submit"
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="overflow-x-auto w-full mt-4">
        <Table>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Link</Table.HeadCell>
            <Table.HeadCell>created_at</Table.HeadCell>
            <Table.HeadCell>Updated_at</Table.HeadCell>
            <Table.HeadCell>status</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {sources?.map((source) => (
              <Table.Row
                key={source.id}
                className="bg-white dark:bor{}er-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{source.id}</Table.Cell>
                <Table.Cell className=" font-medium text-gray-900 dark:text-white ">
                  {source.link}
                </Table.Cell>
                <Table.Cell>
                  {new Date(source.created_at).toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                  })}
                </Table.Cell>
                <Table.Cell>
                  {new Date(source.updated_at).toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                  })}
                </Table.Cell>
                <Table.Cell>
                  {source.status == 1 ? "Active" : "Inactive"}
                </Table.Cell>
                <Table.Cell className="flex">
                  <span className="cursor-pointer">
                    <FaEdit color="red" />
                  </span>
                  <span className="cursor-pointer">
                    <MdDelete color="red" />
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
export default Source;
