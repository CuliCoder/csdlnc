import { Table, Button, Select, Modal, Label, TextInput } from "flowbite-react";
import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "../../config/configAxios";
import { TiTick } from "react-icons/ti";
import { Spinner } from "flowbite-react";
import { useMyContext } from "../../context/ContextAPI";
import { HiOutlineExclamationCircle } from "react-icons/hi";
const Answer = () => {
  const [answers, setAnswers] = useState([]);
  const [search, setSearch] = useState("");
  const [option, setOption] = useState("id");
  const countTimeFind = useRef(null);
  const [loading, setLoading] = useState(false);
  const [fisrtLoad, setFirstLoad] = useState(true);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState({
    open: false,
    data: {
      id: null,
      answer: null,
      correct: null,
    },
  });
  const [openModalDelete, setOpenModalDelete] = useState({
    open: false,
    id: null,
  });
  const fetchAnswers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/answer");
      setAnswers(res.data);
    } catch (err) {
      console.log(err);
      setAnswers(err.response.data);
    }
    setLoading(false);
  }, []);
  useEffect(() => {
    fetchAnswers();
    setFirstLoad(false);
  }, []);
  useEffect(() => {
    if (fisrtLoad) return;
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
  const onCloseModalAdd = useCallback(() => {
    setOpenModalAdd(false);
  }, []);
  const onCloseModalEdit = useCallback(() => {
    setOpenModalEdit({ ...openModalEdit, open: false });
  }, []);
  const onCloseModalDelete = useCallback(() => {
    setOpenModalDelete({ ...openModalDelete, open: false });
  }, []);
  return (
    <div className="flex flex-col items-center">
      <ModalAddAnswer
        openModal={openModalAdd}
        onCloseModal={onCloseModalAdd}
        fetchAnswers={fetchAnswers}
      />
      <ModalEditQuestion
        openModal={openModalEdit}
        onCloseModal={onCloseModalEdit}
        fetchAnswers={fetchAnswers}
      />
      <ModalDeleteAnswer
        openModal={openModalDelete}
        onCloseModal={onCloseModalDelete}
        fetchAnswers={fetchAnswers}
      />
      <div className="flex text-2xl font-bold mt-4 mb-10 !important">
        Danh sách các đáp án
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
        <Button onClick={() => setOpenModalAdd(true)}>Thêm</Button>
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
            <ListAnswer
              answers={answers}
              openModalEdit={setOpenModalEdit}
              openModalDelete={setOpenModalDelete}
            />
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
const ListAnswer = React.memo(({ answers, openModalEdit, openModalDelete }) => {
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
        <span
          className="cursor-pointer"
          onClick={() =>
            openModalEdit({
              open: true,
              data: {
                id: answer.id,
                answer: answer.answer,
                correct: answer.correct,
                questionId: answer.id_question,
              },
            })
          }
        >
          <FaEdit color="red" />
        </span>
        <span
          className="cursor-pointer"
          onClick={() =>
            openModalDelete({
              open: true,
              id: answer.id,
              questionId: answer.id_question,
            })
          }
        >
          <MdDelete color="red" />
        </span>
      </Table.Cell>
    </Table.Row>
  ));
});
const ModalAddAnswer = memo(({ openModal, onCloseModal, fetchAnswers }) => {
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [correct, setCorrect] = useState("1");
  const { setToast } = useMyContext();
  const handleAddAnswer = async (e) => {
    e.preventDefault();
    try {
      if (answer === "" || questionId === "") {
        setToast("error", "Vui lòng nhập đầy đủ thông tin");
        return;
      }
      if (isNaN(questionId)) {
        setToast("error", "Id câu hỏi phải là số");
        return;
      }
      const res = await axios.post("/api/answer/create", {
        answer,
        questionId,
        correct,
      });
      if (res.data.error === 0) {
        fetchAnswers();
        onCloseModal();
      }
      setToast(res.data.error === 0 ? "success" : "error", res.data.message);
    } catch (err) {
      setToast("error", err.response.data.message);
    }
  };
  useEffect(() => {
    if (!openModal) {
      setAnswer("");
      setQuestionId("");
    }
  }, [openModal]);
  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <form className="space-y-6" onSubmit={handleAddAnswer}>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Thêm đáp án
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="question" value="Nhập đáp án " />
            </div>
            <TextInput
              id="question"
              placeholder="Answer ..."
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              required
            />
            <div className="mb-2 block">
              <Label htmlFor="questionId" value="Id câu hỏi" />
            </div>
            <TextInput
              id="questionId"
              placeholder="Id câu hỏi ..."
              value={questionId}
              onChange={(event) => setQuestionId(event.target.value)}
              required
            />
            <div className="mb-2 block">
              <Label htmlFor="correct" value="Correct" />
            </div>
            <Select
              id="correct"
              required
              onChange={(e) => setCorrect(e.target.value)}
              value={correct}
            >
              <option value={"1"}>Correct</option>
              <option value={"0"}>Wrong</option>
            </Select>
          </div>
          <div className="w-full flex justify-end mt-4">
            <Button type="submit">Thêm</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
});
const ModalEditQuestion = memo(({ openModal, onCloseModal, fetchAnswers }) => {
  const [answer, setAnswer] = useState(openModal.data.answer);
  const [correct, setCorrect] = useState(openModal.data.correct);
  const { setToast } = useMyContext();
  useEffect(() => {
    if (!openModal.open) {
      setAnswer("");
      setCorrect("");
      return;
    }
    setAnswer(openModal.data.answer);
    setCorrect(openModal.data.correct);
  }, [openModal]);
  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      if (answer === "") {
        setToast("error", "Vui lòng nhập đầy đủ thông tin");
        return;
      }
      const res = await axios.put("/api/answer/edit", {
        id: openModal.data.id,
        answer,
        correct,
        questionId: openModal.data.questionId,
      });
      if (res.data.error === 0) {
        fetchAnswers();
        onCloseModal();
      }
      setToast(res.data.error === 0 ? "success" : "error", res.data.message);
    } catch (err) {
      setToast("error", err.response.data.message);
    }
  };
  return (
    <Modal show={openModal.open} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <form className="space-y-6" onSubmit={handleAddQuestion}>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Sửa đáp án
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="question" value="Nhập đáp án" />
            </div>
            <TextInput
              id="question"
              placeholder="Answer ..."
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              required
            />
            <div className="mb-2 block">
              <Label htmlFor="correct" value="Correct" />
            </div>
            <Select
              id="correct"
              required
              onChange={(e) => setCorrect(e.target.value)}
              value={correct}
            >
              <option value={"1"}>Correct</option>
              <option value={"0"}>Wrong</option>
            </Select>
          </div>
          <div className="w-full flex justify-end mt-4">
            <Button type="submit">Sửa</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
});
const ModalDeleteAnswer = memo(({ openModal, onCloseModal, fetchAnswers }) => {
  const { setToast } = useMyContext();
  const handleDeleteAnswer = async () => {
    try {
      const res = await axios.put(`/api/answer/delete/${openModal.id}`, {
        questionId: openModal.questionId,
      });
      if (res.data.error === 0) {
        fetchAnswers();
        onCloseModal();
      }
      setToast(res.data.error === 0 ? "success" : "error", res.data.message);
    } catch (error) {
      setToast("error", error.response.data.message);
    }
  };
  return (
    <Modal show={openModal.open} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {`Bạn có chắc chắn muốn xóa đáp án có id = ${openModal.id} không?`}
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDeleteAnswer}>
              {"Có, tôi chắc chắn"}
            </Button>
            <Button color="gray" onClick={onCloseModal}>
              Không
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
});
export default Answer;
