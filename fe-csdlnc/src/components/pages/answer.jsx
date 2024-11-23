import { Table, Button, Select } from "flowbite-react";
import React, { useEffect, useState, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "../../config/configAxios";
import { TiTick } from "react-icons/ti";
import { Spinner } from "flowbite-react";
const Question = () => {
  const [answers, setAnswers] = useState([]);
  const [search, setSearch] = useState("");
  const [option, setOption] = useState("id");
  const countTimeFind = useRef(null);
  const [loading, setLoading] = useState(false);
  const fetchAnswers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/answer");
      setAnswers(res.data);
    } catch (err) {
      console.log(err);
      setAnswers(err.response.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchAnswers();
  }, []);
  useEffect(() => {
    if (countTimeFind.current) {
      clearTimeout(countTimeFind.current);
    }
    countTimeFind.current = setTimeout(() => {
      if (search === "") {
        fetchAnswers();
        return;
      }
      handleFind();
    }, 500);
    return () => {
      clearTimeout(countTimeFind.current);
    };
  }, [search, option]);
  const handleFind = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/answer/${option}/${search}`);
      setAnswers(res.data);
    } catch (err) {
      console.log(err);
      setAnswers(err.response.data);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex text-2xl font-bold mt-4 mb-10 !important">
        Danh sách các câu trả lời
      </div>
      <div className="w-full flex justify-end space-x-4 pr-4  ">
        <div className="flex">
          <Select
            id="option"
            required
            value={option}
            onChange={(e) => setOption(e.target.value)}
          >
            <option value={"id"}>ID</option>
            <option value={"content"}>Answer</option>
            <option value={"questionId"}>QuestionId</option>
            <option value={"correct"}>Correct</option>
          </Select>
          <div className="w-full max-w-md mx-auto relative ">
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
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <button
                type="submit"
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <Button className="">Thêm</Button>
      </div>
      <div className="relative overflow-x-auto w-full mt-4 h-screen">
        {loading && (
          <div className="absolute inset-0 flex justify-center bg-opacity-50 bg-gray-200 z-10 pt-4">
            <Spinner
              aria-label="Center-aligned spinner example"
              className="mt-4"
              size="xl"
            />
          </div>
        )}
        <Table>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Answer</Table.HeadCell>
            <Table.HeadCell>QuestionId</Table.HeadCell>
            <Table.HeadCell>Correct</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <ListAnswer answers={answers} />
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
const ListAnswer = React.memo(({ answers }) => {
  return answers?.map((answer) => (
    <Table.Row
      key={answer.id}
      className="bg-white dark:bor{}er-gray-700 dark:bg-gray-800"
    >
      <Table.Cell>{answer.id}</Table.Cell>
      <Table.Cell className=" font-medium text-gray-900 dark:text-white ">
        {answer.answer}
      </Table.Cell>
      <Table.Cell>{answer.id_question}</Table.Cell>
      <Table.Cell>
        {answer.correct == "0" ? "" : <TiTick color="green" size={30} />}
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
  ));
});


export default Question;
