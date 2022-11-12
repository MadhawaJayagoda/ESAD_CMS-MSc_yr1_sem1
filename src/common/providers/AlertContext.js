import React, { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const getSuccessToast = (text) => {
    return (
      <>
        <ToastContainer>
          {toast.success(text, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })}
        </ToastContainer>
      </>
    );
  };

  const getErrorToast = (text) => {
    return (
      <>
        <ToastContainer>
          {toast.error(text, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })}
        </ToastContainer>
      </>
    );
  };

  return (
    <AlertContext.Provider value={{ getSuccessToast, getErrorToast }}>
      {children}
    </AlertContext.Provider>
  );
}

export default AlertContext;
