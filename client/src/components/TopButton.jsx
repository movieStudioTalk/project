// components/TopButton.js
import React, { useEffect, useState } from "react";
import "./css/TopButton.css";

function TopButton({ isModalOpen, onToggleFilter }) {
   const [isVisible, setIsVisible] = useState(false);
   const [showAll, setShowAll] = useState(true); // UI 텍스트 전용 상태

   useEffect(() => {
      const handleScroll = () => {
         setIsVisible(window.scrollY > 200);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   const scrollToTop = () => {
      if (!isModalOpen) {
         window.scrollTo({ top: 0, behavior: "smooth" });
      }
   };

   const toggleView = () => {
      const newState = !showAll;
      setShowAll(newState); // 버튼 텍스트 변경용
      onToggleFilter(); // App에 상태 반영
   };

   if (isModalOpen) return null;

   return (
      isVisible && (
         <div className="top-button-group">
            <button className="filter-toggle-button" onClick={toggleView}>
               {showAll ? "상품 전체보기" : "상품 분류하기"}
            </button>
            <button className="top-button" onClick={scrollToTop}>
               ↑ TOP
            </button>
         </div>
      )
   );
}

export default TopButton;
