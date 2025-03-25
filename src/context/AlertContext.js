"use client"

import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null); // { type: 'error' | 'success', message: string }

  const showAlert = (type, message) => {
    setAlert({ type, message });

    setTimeout(() => {
      setAlert(null); //자동 닫기 (3초 후)
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

//Hook
export const useAlert = () => useContext(AlertContext);
