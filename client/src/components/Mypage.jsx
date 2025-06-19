import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Mypage = () => {
  const { isLoggedIn, logName, logId } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isLoggedIn) {
    alert("잘못된접근입니다.");
    navigate("/");
  }

  return;
};

export default Mypage;
