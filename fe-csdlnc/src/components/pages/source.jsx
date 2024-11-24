import { Table, Button, Select } from "flowbite-react";
import { useEffect, useState, memo, useRef, useCallback } from "react";
import { Spinner, Datepicker } from "flowbite-react";
import { FaEdit } from "react-icons/fa";
import axios from "../../config/configAxios";
import { Modal, Label, TextInput } from "flowbite-react";
import { useMyContext } from "../../context/ContextAPI";
const Source = () => {
  const { isLogin } = useMyContext();
  const [sources, setSources] = useState([]);
  const [option, setOption] = useState("id");
  const [date, setDate] = useState(null);
  const [searchDate, setSearchDate] = useState("created_at");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const countTimeFind = useRef(null);
  const [fisrtLoad, setFirstLoad] = useState(true);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState({
    open: false,
    data: {
      id: null,
      source: null,
      status: null,
    },
  });
  const fetchSources = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/source/${searchDate}/${date}`);
      setSources(res.data);
    } catch (err) {
      setSources([]);
    }
    setLoading(false);
  }, [date, searchDate]);
  useEffect(() => {
    fetchSources();
    setFirstLoad(false);
  }, []);
  useEffect(() => {
    if (fisrtLoad) return;
    if (countTimeFind.current) {
      clearTimeout(countTimeFind.current);
    }
    countTimeFind.current = setTimeout(() => {
      if (search === "") {
        fetchSources();
        return;
      }
      handleFind();
    }, 500);
    return () => {
      clearTimeout(countTimeFind.current);
    };
  }, [search, option, date, searchDate]);
  const handleFind = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/source/${option}/${search}/${searchDate}/${date}`
      );
      setSources(res.data);
    } catch (err) {
      setSources([]);
    }
    setLoading(false);
  };
  const onCloseModalAdd = useCallback(() => {
    setOpenModalAdd(false);
  }, []);
  const onCloseModalEdit = useCallback(() => {
    setOpenModalEdit({ ...openModalEdit, open: false });
  }, []);
  return (
    <div className="flex flex-col">
      <ModalAddSource
        openModal={openModalAdd}
        onCloseModal={onCloseModalAdd}
        fetchSources={fetchSources}
        setLoading={setLoading}
      />
      <ModalEditSource
        openModal={openModalEdit}
        onCloseModal={onCloseModalEdit}
        fetchSources={fetchSources}
        setLoading={setLoading}
      />
      <div className="flex text-2xl font-bold mt-4 mb-10 mx-auto !important">
        Danh sách các nguồn câu hỏi
      </div>
      <div className="w-full flex justify-end space-x-4 pr-4">
        <div className="flex items-center space-x-4">
          <Select
            id="option"
            required
            onChange={(e) => setSearchDate(e.target.value)}
            value={searchDate}
          >
            <option value={"created_at"}>Created_at</option>
            <option value={"updated_at"}>Updated_at</option>
          </Select>
          <Datepicker id="date" onChange={(date) => setDate(date)} />
        </div>
        <div className="flex ">
          <Select
            id="option"
            required
            onChange={(e) => setOption(e.target.value)}
            value={option}
          >
            <option value={"id"}>ID</option>
            <option value={"link"}>Link</option>
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        {isLogin && <Button onClick={() => setOpenModalAdd(true)}>Thêm</Button>}
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
            <Table.HeadCell>Link</Table.HeadCell>
            <Table.HeadCell>created_at</Table.HeadCell>
            <Table.HeadCell>Updated_at</Table.HeadCell>
            <Table.HeadCell>status</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <ListSource sources={sources} openModalEdit={setOpenModalEdit} />
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
const ListSource = memo(({ sources, openModalEdit }) => {
  const { isLogin } = useMyContext();
  return sources?.map((source) => (
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
      <Table.Cell>{source.status == 1 ? "Active" : "Inactive"}</Table.Cell>
      <Table.Cell className="flex">
        {isLogin && (
          <span
            className="cursor-pointer"
            onClick={() =>
              openModalEdit({
                open: true,
                data: {
                  id: source.id,
                  source: source.link,
                  status: source.status,
                },
              })
            }
          >
            <FaEdit color="red" />
          </span>
        )}
      </Table.Cell>
    </Table.Row>
  ));
});
const ModalAddSource = memo(({ openModal, onCloseModal, fetchSources, setLoading }) => {
  const [link, setLink] = useState("");
  const { setToast } = useMyContext();
  const handleAddSource = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (!link) {
        setToast("error", "Vui lòng nhập đầy đủ thông tin");
        return;
      }
      const res = await axios.post("/api/source/create", {
        source: link,
      });
      if (res.data.error === 0) {
        fetchSources();
        onCloseModal();
      }
      setToast(res.data.error === 0 ? "success" : "error", res.data.message);
    } catch (err) {
      setToast("error", err.response.data.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (!openModal) {
      setLink("");
    }
  }, [openModal]);
  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <form className="space-y-6" onSubmit={handleAddSource}>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Thêm nguồn câu hỏi
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="source" value="Nhập nguồn" />
            </div>
            <TextInput
              id="source"
              placeholder="Source ..."
              value={link}
              onChange={(event) => setLink(event.target.value)}
              required
            />
          </div>
          <div className="w-full flex justify-end mt-4">
            <Button type="submit">Thêm</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
});
const ModalEditSource = memo(({ openModal, onCloseModal, fetchSources, setLoading }) => {
  const [source, setSource] = useState(openModal.data.source);
  const [status, setStatus] = useState(openModal.data.status);
  const { setToast } = useMyContext();
  useEffect(() => {
    if (!openModal.open) {
      setSource("");
      setStatus("");
      return;
    }
    setSource(openModal.data.source);
    setStatus(openModal.data.status);
  }, [openModal]);
  const handleEditSource = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (!source) {
        setToast("error", "Vui lòng nhập đầy đủ thông tin");
        return;
      }
      const res = await axios.put("/api/source/edit", {
        id: openModal.data.id,
        source,
        status,
      });
      if (res.data.error === 0) {
        fetchSources();
        onCloseModal();
      }
      setToast(res.data.error === 0 ? "success" : "error", res.data.message);
    } catch (err) {
      setToast("error", err.response.data.message);
    }
    setLoading(false);
  };
  return (
    <Modal show={openModal.open} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <form className="space-y-6" onSubmit={handleEditSource}>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Sửa câu hỏi
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="source" value="Nội dung câu hỏi" />
            </div>
            <TextInput
              id="source"
              placeholder="Source ..."
              value={source}
              onChange={(event) => setSource(event.target.value)}
              required
            />
            <div className="mb-2 block">
              <Label htmlFor="status" value="Status" />
            </div>
            <Select
              id="status"
              required
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
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
export default Source;
