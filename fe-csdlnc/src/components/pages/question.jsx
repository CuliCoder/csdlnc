import {
  Table,
  Button,
  Select,
  Label,
  TextInput,
  Modal,
  Checkbox,
} from "flowbite-react";
import React, { useEffect, useState, useRef, memo, useCallback } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "../../config/configAxios";
import { Spinner } from "flowbite-react";
const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [option, setOption] = useState("id");
  const [search, setSearch] = useState("");
  const countTimeFind = useRef(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/question");
      setQuestions(res.data);
    } catch (err) {
      console.log(err);
      setQuestions([]);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    if (countTimeFind.current) {
      clearTimeout(countTimeFind.current);
    }
    countTimeFind.current = setTimeout(() => {
      if (search === "") {
        fetchQuestions();
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
      const res = await axios.get(`/api/question/${option}/${search}`);
      setQuestions(res.data);
    } catch (err) {
      console.log(err);
      setQuestions([]);
    }
    setLoading(false);
  };
  const onCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);
  return (
    <div className="flex flex-col">
      <ModalAddQuestion openModal={openModal} onCloseModal={onCloseModal} />
      <div className="flex text-2xl font-bold mt-4 mb-10 mx-auto !important">
        Danh sách các nội dung câu hỏi
      </div>
      <div className="w-full flex justify-end space-x-4 pr-4 ">
        <div className="flex">
          <Select
            id="option"
            required
            onChange={(e) => setOption(e.target.value)}
            value={option}
          >
            <option value={"id"}>ID</option>
            <option value={"content"}>Question</option>
            <option value={"sourceId"}>SourceId</option>
            <option value={"userId"}>UserId</option>
            <option value={"status"}>Status</option>
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
            </div>
          </div>
        </div>
        <Button onClick={() => setOpenModal(true)}>Thêm</Button>
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
            <Table.HeadCell>Question</Table.HeadCell>
            <Table.HeadCell>sourceId</Table.HeadCell>
            <Table.HeadCell>UserId</Table.HeadCell>
            <Table.HeadCell>Updated_at</Table.HeadCell>
            <Table.HeadCell>status</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <ListQuestion questions={questions} />
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
const ListQuestion = React.memo(({ questions }) => {
  return questions?.map((question) => (
    <Table.Row
      key={question.id}
      className="bg-white dark:bor{}er-gray-700 dark:bg-gray-800"
    >
      <Table.Cell>{question.id}</Table.Cell>
      <Table.Cell className=" font-medium text-gray-900 dark:text-white ">
        {question.question}
      </Table.Cell>
      <Table.Cell>{question.id_source}</Table.Cell>
      <Table.Cell>{question.id_user}</Table.Cell>
      <Table.Cell>
        {new Date(question.updated_at).toLocaleString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
        })}
      </Table.Cell>
      <Table.Cell>{question.status == 1 ? "Active" : "Inactive"}</Table.Cell>
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
const ModalAddQuestion = memo(({ openModal, onCloseModal }) => {
  const [question, setQuestion] = useState("");
  const handleAddQuestion = async () => {
    try {
      await axios.post("/api/question", { question });
      onCloseModal();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Thêm nội dung câu hỏi
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="question" value="Nội dung câu hỏi" />
            </div>
            <TextInput
              id="question"
              placeholder="Question ..."
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              required
            />
          </div>
          <div className="w-full flex justify-end mt-4">
            <Button>Thêm</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
});
export default Question;
