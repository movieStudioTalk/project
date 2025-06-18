import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // ← 수정
import api from "../js/api";
import alarmIcon from "../assets/alarmIcon.png";
import loginIcon from "../assets/loginIcon.png";
import logoImg from "../assets/logo2.png";
import "./css/NavBar.css";

const NavBar = () => {
   const [currentAlarm, setAlarm] = useState(false);
   const { isLoggedIn, logName, setIsLoggedIn, setLogName } =
      useContext(AuthContext);
   const navigate = useNavigate();

   // 마운트 시 사용자 정보·알림 상태 불러오기
   useEffect(() => {
      const fetchUserData = async () => {
         try {
            const res = await api.get("/user/profile");
            setIsLoggedIn(true);
            setLogName(res.data.name);
         } catch (err) {
            console.error("유저 정보 로드 실패:", err);
            setIsLoggedIn(false);
            setLogName("");
         }
      };
      const fetchAlarmStatus = async () => {
         try {
            const res = await api.get("/alarm/status");
            setAlarm(res.data.active);
         } catch (err) {
            console.error("알림 상태 로드 실패:", err);
         }
      };
      fetchUserData();
      fetchAlarmStatus();
   }, [setIsLoggedIn, setLogName]);

   const handleLogin = () => navigate("/login");

   const handleLogout = async () => {
      try {
         await api.post("/user/logout");
         setIsLoggedIn(false);
         setLogName("");
         navigate("/");
      } catch (err) {
         console.error("로그아웃 실패:", err);
         alert("로그아웃 중 오류가 발생했습니다.");
      }
   };

   const handleAlarmToggle = async () => {
      try {
         const res = await api.post("/alarm/toggle");
         setAlarm(res.data.active);
      } catch (err) {
         console.error("알림 토글 실패:", err);
         alert("알림 설정 변경에 실패했습니다.");
      }
   };

   return (
      <nav className="navbar">
         <div className="navbar__logo">
            <a href="/">
               <img src={logoImg} alt="Logo" />
            </a>
         </div>
         <div className="navbar__actions">
            <button className="alarm-btn" onClick={handleAlarmToggle}>
               <img src={alarmIcon} alt="alarm" className="alarmIcon" />
               <p>{currentAlarm ? "알람받는중" : "알림받기"}</p>
            </button>

            {isLoggedIn ? (
               <>
                  <span className="user-name">{logName}님</span>
                  <button className="login-btn" onClick={handleLogout}>
                     <img src={loginIcon} alt="logout" className="loginIcon" />
                     <p>로그아웃</p>
                  </button>
               </>
            ) : (
               <button className="login-btn" onClick={handleLogin}>
                  <img src={loginIcon} alt="login" className="loginIcon" />
                  <p>로그인</p>
               </button>
            )}
         </div>
      </nav>
   );
};

export default NavBar;
