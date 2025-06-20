import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import api from "../js/api";
import "./css/AlarmPromo.css";

const AlarmPromo = () => {
   const { isLoggedIn, currentAlarm, setAlarm } = useContext(AuthContext);
   const navigate = useNavigate();

   const handleClick = async () => {
      if (!isLoggedIn) {
         navigate("/login");
         return;
      }

      const text = currentAlarm ? "구독 취소" : "구독";
      if (!confirm(`${text}하시겠습니까?`)) return;

      try {
         const res = await api.post("/user/alarm");
         setAlarm(res.data.isSuccess);
         alert(res.data.msg);
      } catch (err) {
         console.error("알림 토글 실패:", err);
         alert("알림 설정 변경에 실패했습니다.");
      }
   };

   return (
      <div className="alarm-promo">
         <p className="promo-text">
            새로운 굿즈 출시 알림을 카카오톡으로 받아보세요!
         </p>
         <button className="promo-btn" onClick={handleClick}>
            {currentAlarm ? "알림 끄기" : "알림받기"}
         </button>
      </div>
   );
};

export default AlarmPromo;
