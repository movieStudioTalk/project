import React, { useState } from "react";
import api from "../js/api";
import "../css/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    user_pw: "",
    confirm_pw: "",
    user_name: "",
    user_email: "",
    account_type: "home",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.user_pw !== formData.confirm_pw) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await api.post("/user/userAdd", {
        user_id: formData.user_id,
        user_pw: formData.user_pw,
        user_name: formData.user_name,
        user_email: formData.user_email,
        account_type: formData.account_type,
      });

      if (res.data.isSuccess) {
        setMessage(res.data.msg);
        alert(res.data.msg);
        location.href = "/login";
      } else {
        setMessage(res.data.msg);
      }
    } catch (error) {
      console.error(error);
      setMessage("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="register-container">
      <h1>GOOD-PING 회원가입</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="account_type"
          value={formData.account_type}
        />
        <input
          type="text"
          name="user_id"
          placeholder="아이디"
          value={formData.user_id}
          onChange={handleChange}
        />
        <input
          type="password"
          name="user_pw"
          placeholder="비밀번호"
          value={formData.user_pw}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirm_pw"
          placeholder="비밀번호 확인"
          value={formData.confirm_pw}
          onChange={handleChange}
        />
        <input
          type="text"
          name="user_name"
          placeholder="이름"
          value={formData.user_name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="user_email"
          placeholder="이메일"
          value={formData.user_email}
          onChange={handleChange}
        />
        <button type="submit">회원가입 완료</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
