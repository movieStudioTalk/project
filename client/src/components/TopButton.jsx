// components/TopButton.js
import React, { useEffect, useState, useRef } from "react";
import "./css/TopButton.css";

function TopButton({
   showModal,
   onToggleFilter,
   onOpenCreateModal,
   isCreateModalOpen,
}) {
   const [isVisible, setIsVisible] = useState(false);
   const [showAll, setShowAll] = useState(true); // UI 텍스트 전용 상태
   const didMountRef = useRef(false); // 최초 마운트 여부 체크용

   useEffect(() => {
      const handleScroll = () => {
         setIsVisible(window.scrollY > 200);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   const scrollToTop = () => {
      if (!showModal && !isCreateModalOpen) {
         window.scrollTo({ top: 0, behavior: "smooth" });
      }
   };
   useEffect(() => {
      if (didMountRef.current) {
         // 마운트 후 showAll이 바뀔 때만 실행
         scrollToAllProducts();
      } else {
         didMountRef.current = true; // 첫 렌더링 무시
      }
   }, [showAll]);

   const scrollToAllProducts = () => {
      const target =
         document.getElementById("all-products") ||
         document.getElementById("popular");
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 0;

      if (target) {
         const top =
            target.getBoundingClientRect().top + window.scrollY - headerHeight;
         window.scrollTo({ top, behavior: "smooth" });
      }
   };

   const toggleView = () => {
      if (isCreateModalOpen) return;
      const newState = !showAll;
      setShowAll(newState);
      onToggleFilter();
      scrollToAllProducts();
   };

   return (
      isVisible && (
         <div className={`top-button-group`}>
            <button className="create-button" onClick={onOpenCreateModal}>
               상품 추가하기
            </button>
            <button className="filter-toggle-button" onClick={toggleView}>
               {showAll ? "상품 전체보기" : "상품 분류하기"}
            </button>
            <button className="top-button" onClick={scrollToTop}>
               TOP ▲
            </button>
         </div>
      )
   );
}

export default TopButton;
