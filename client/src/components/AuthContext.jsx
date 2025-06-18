import React, { createContext, useState, useEffect } from "react";
import api from "../js/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logName, setLogName] = useState("");
  const [currentAlarm, setAlarm] = useState(false);

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

  const fetchAlarmStatus = async () => {
    try {
      const res = await api.get("/user/alarmStatus");
      console.log(res);
      setAlarm(res.data.isSuccess);
    } catch (err) {
      console.error("알림 상태 로드 실패:", err);
    }
  };

  useEffect(() => {
    checkLogin();
    fetchAlarmStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        logName,
        setLogName,
        checkLogin,
        currentAlarm,
        setAlarm,
        fetchAlarmStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
