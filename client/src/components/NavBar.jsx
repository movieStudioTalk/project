import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import api from "../js/api";
import alarmIcon from "../assets/alarmIcon.png";
import loginIcon from "../assets/loginIcon.png";
import logoImg from "../assets/logo2.png";
import "./css/NavBar.css";

const NavBar = () => {
  const {
    isLoggedIn,
    logName,
    logId,
    setIsLoggedIn,
    setLogName,
    currentAlarm,
    setAlarm,
  } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // 마운트 시 사용자 정보·알림 상태 로드 (필요 시 로직 추가)
  useEffect(() => {
    // const fetchUserData = async () => {
    //   try {
    //     const res = await api.get("/user/profile");
    //     setIsLoggedIn(true);
    //     setLogName(res.data.name);
    //   } catch (err) {
    //     console.error("유저 정보 로드 실패:", err);
    //     setIsLoggedIn(false);
    //     setLogName("");
    //   }
    // };
    // fetchUserData();
  }, [setIsLoggedIn, setLogName]);

  // 스크롤 감지 및 body.nav-solid 토글
  useEffect(() => {
    const onScroll = () => {
      const sc = window.scrollY > 0;
      setIsScrolled(sc);
      document.body.classList.toggle("nav-solid", sc);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogin = () => navigate("/login");

  const handleLogout = async () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      try {
        await api.post("/user/userLogout");
        setIsLoggedIn(false);
        setLogName("");
        navigate("/");
      } catch (err) {
        console.error("로그아웃 실패:", err);
        alert("로그아웃 중 오류가 발생했습니다.");
      }
    }
  };

  const handleAlarmToggle = async () => {
    const text = currentAlarm ? "구독 취소" : "구독";
    if (confirm(`${text}하시겠습니까?`)) {
      try {
        const res = await api.post("/user/alarm");
        setAlarm(res.data.isSuccess);
        alert(res.data.msg);
      } catch (err) {
        console.error("알림 토글 실패:", err);
        alert("알림 설정 변경에 실패했습니다.");
      }
    }
  };

  const locationMypage = () => {
    navigate("/mypage");
  };
  return (
    <nav className={`navbar ${isScrolled ? "solid" : ""}`}>
      <div className="navbar__logo">
        <a href="/">
          <img src={logoImg} alt="Logo" />
        </a>
      </div>
      <div className="navbar__actions">
        {isLoggedIn && logId !== "admin" && (
          <button className="alarm-btn" onClick={handleAlarmToggle}>
            <img src={alarmIcon} alt="alarm" className="alarmIcon" />
            <p>{currentAlarm ? "알람받는중" : "알림받기"}</p>
          </button>
        )}
        {isLoggedIn ? (
          <>
            <span className="user-name" onClick={locationMypage}>
              {logName}님
            </span>
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
