import React, { createContext, useState, useEffect } from "react";
import api from "../js/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logName, setLogName] = useState("");

  const checkLogin = async () => {
    try {
      const res = await api.get("/user/checkSession");
      if (res.data.isLoggedIn) {
        setIsLoggedIn(true);
        setLogName(res.data.user_name);
      } else {
        setIsLoggedIn(false);
        setLogName("");
      }
    } catch (err) {
      console.error(err);
      setIsLoggedIn(false);
      setLogName("");
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, logName, setLogName, checkLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
