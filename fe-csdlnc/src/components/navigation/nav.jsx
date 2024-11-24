import {
  Button,
  Drawer,
  Sidebar,
  TextInput,
  Label,
  Modal,
} from "flowbite-react";
import { useCallback, useState, memo, useEffect } from "react";
import { HiChartPie, HiSearch } from "react-icons/hi";
import { FaQuestion } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";
import { GrResources } from "react-icons/gr";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useMyContext } from "../../context/ContextAPI";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "../../config/configAxios";
const Navigation = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin } = useMyContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  const onCloseLogoutModal = useCallback(() => {
    setIsLogoutModalOpen(false);
  }, []);
  useEffect(() => {
    
  }, []);
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "10px",
          zIndex: 1000,
        }}
        onMouseEnter={handleOpen}
      />
      <ModalLogin openModal={isModalOpen} onCloseModal={onCloseModal} />
      <ModalLogout
        openModal={isLogoutModalOpen}
        onCloseModal={onCloseLogoutModal}
      />
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <form className="pb-3 md:hidden">
                  <TextInput
                    icon={HiSearch}
                    type="search"
                    placeholder="Search"
                    required
                    size={32}
                  />
                </form>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item href="/" icon={HiChartPie}>
                      Dashboard
                    </Sidebar.Item>
                    <Sidebar.Item href="/question" icon={FaQuestion}>
                      Question
                    </Sidebar.Item>
                    <Sidebar.Item href="/answer" icon={MdQuestionAnswer}>
                      Answer
                    </Sidebar.Item>
                    <Sidebar.Item href="/source" icon={GrResources}>
                      Source
                    </Sidebar.Item>
                    <Sidebar.Item
                      icon={isLogin ? FiLogOut : FiLogIn}
                      onClick={() => {
                        if (isLogin) {
                          setIsLogoutModalOpen(true);
                        } else {
                          setIsModalOpen(true);
                        }
                      }}
                    >
                      {isLogin ? "Logout" : "Login"}
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
});
const ModalLogin = ({ openModal, onCloseModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToast, setIsLogin } = useMyContext();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", {
        username,
        password,
      });
      if (res.data.error === "0") {
        onCloseModal();
        setIsLogin(true);
        setUsername("");
        setPassword("");
      }
      setToast(res.data.error === "0" ? "success" : "error", res.data.message);
    } catch (err) {
      setToast("error", err.response.data.message);
    }
  };
  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <form className="space-y-6" onSubmit={handleLogin}>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Đăng nhập
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              id="password"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              placeholder="Password"
              required
            />
          </div>
          <div className="w-full flex justify-end mt-4">
            <Button type="submit">Log in</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
const ModalLogout = memo(({ openModal, onCloseModal }) => {
  const { setToast, setIsLogin } = useMyContext();
  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/logout");
      if (res.data.error === 0) {
        setIsLogin(false);
        onCloseModal();
      }
      setToast(res.data.error === 0 ? "success" : "error", res.data.message);
    } catch (err) {
      setToast("error", err.response.data.message);
    }
  };
  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {`Bạn có muốn đăng xuất không?`}
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleLogout}>
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
export default Navigation;
