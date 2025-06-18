import alarmIcon from "../assets/alarmIcon.png";
import loginIcon from "../assets/loginIcon.png";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/logo2.png";
import { AuthContext } from "./AuthContext";
import api from "../js/api";

function Nav() {
  const [currentAlarm, setAlarm] = useState(false);
  const { isLoggedIn, logName, setIsLoggedIn, setLogName } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
    console.log(123);
  };

  const handleLogout = async () => {
    await api.post("/user/userLogout");
    setIsLoggedIn(false);
    setLogName("");
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <div className="overlay-nav">
      <div className="top-bar">
        <div className="logo">
          <a href="/">
            <img src={logoImg} alt="GOOD-PING Logo" className="logo" />
          </a>
        </div>

        <div className="top-buttons">
          <button
            className="notify-btn"
            onClick={() => {
              setAlarm((prev) => !prev);
            }}
          >
            <img src={alarmIcon} alt="alarm" className="alarmIcon" />
            <p>{currentAlarm ? "알람받는중" : "알람받기"}</p>
          </button>
          {isLoggedIn ? (
            <>
              <span>{logName}님</span>
              <button className="login-btn" onClick={handleLogout}>
                <img src={loginIcon} alt="login" className="loginIcon" />
                <p>로그아웃</p>
              </button>
            </>
          ) : (
            <>
              <button className="login-btn" onClick={handleLogin}>
                <img src={loginIcon} alt="login" className="loginIcon" />
                <p>로그인</p>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
