import { createContext, useState } from "react";

export const MyContext = createContext();


export const MyProvider = ({ children }) => {

  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [userName, setUserName] = useState(localStorage.getItem("username"));

  return (
    <MyContext.Provider
      value={{ userId, setUserId, userName, setUserName}}
    >
      {children}
    </MyContext.Provider>
  );
};
