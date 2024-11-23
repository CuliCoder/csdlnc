import Navigation from "../navigation/nav";
import { useEffect } from "react";
import { useMyContext } from "../../context/ContextAPI";
import MyToast from "../MyToast/MyToast";
const Layout = ({ children }) => {
  const { showToast, toastType, toastMessage, closeToast } = useMyContext();
  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        closeToast();
      }, 2000);
    }
  }, [showToast]);
  return (
    <>
      <Navigation />
      <div className="flex justify-end pt-4">
        {showToast && (
          <MyToast classname="" type={toastType} message={toastMessage} />
        )}
      </div>
      {children}
    </>
  );
};

export default Layout;
