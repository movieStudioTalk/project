import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../images/logo.png";
import { AuthContext } from "./AuthContext";
import api from "../js/api";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoggedIn, logName, setIsLoggedIn, setLogName } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    await api.post("/user/userLogout");
    setIsLoggedIn(false);
    setLogName("");
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <header className={`main-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="logo-area">
        <a href="/">
          <img src={logoImg} alt="GOOD-PING Logo" className="logo" />
        </a>
      </div>
      <div className="login-area">
        {isLoggedIn ? (
          <>
            <span>{logName}님</span>
            <button className="login-button" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <button className="login-button" onClick={handleLogin}>
            로그인
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
