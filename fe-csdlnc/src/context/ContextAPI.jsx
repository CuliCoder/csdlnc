import React, { createContext, useContext, useState } from "react";
const ContextAPI = createContext();
export const ContextProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const setToast = (type, message) => {
    setToastType(type);
    setToastMessage(message);
    setShowToast(true);
  };
  const closeToast = () => {
    setShowToast(false);
    setToastType("");
    setToastMessage("");
  };
  return (
    <ContextAPI.Provider
      value={{
        showToast,
        toastType,
        toastMessage,
        isLogin,
        setIsLogin,
        setToast,
        closeToast,
      }}
    >
      {children}
    </ContextAPI.Provider>
  );
};
export const useMyContext = () => useContext(ContextAPI);
