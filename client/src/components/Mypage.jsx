import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import api from "../js/api";

const Mypage = () => {
  const { logName, logId, isAuthLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reservData, setReservData] = useState(null);
  const [formData, setFormData] = useState({
    id: logId,
    name: logName,
    user_phone: "",
    user_email: "",
    user_pw: "",
  });

  useEffect(() => {
    // 아직 로그인 확인 중이면 아무것도 하지 않음
    if (isAuthLoading) return;

    if (!logId) {
      alert("잘못된 접근입니다.");
      navigate("/");
    }

    user_info();
    reserv_info();
  }, [logId, isAuthLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const user_info = async () => {
    try {
      const res = await api.get("/user/mypageInfo", {});
      const userData = res.data.info[0];

      // 한 번에 상태 업데이트
      setFormData((prev) => ({
        ...prev,
        ...userData,
      }));
    } catch (err) {
      console.error("인기 상품 가져오기 실패:", err);
    }
  };

  const reserv_info = async () => {
    try {
      const res = await api.get("/reserv/mypageInfo", {});
      const userData = res.data.info[0];

      setReservData(userData);
    } catch (err) {
      console.error("인기 상품 가져오기 실패:", err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={logName} />
        <input
          type="text"
          name="phone"
          value={formData.user_phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          value={formData.user_email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleChange}
        />
        <input type="password" name="password_at" placeholder="비밀번호 확인" />
      </form>

      <table border="1">
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>결제일</th>
          </tr>
        </thead>
        <tbody>
          {reservData ? (
            <tr>
              <td>{reservData.title}</td>
              <td>{Number(reservData.price).toLocaleString()}원</td>
              <td>{new Date(reservData.create_date).toLocaleDateString()}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="3">로딩 중...</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Mypage;
