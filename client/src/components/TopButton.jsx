// components/TopButton.js
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import "./css/TopButton.css";

function TopButton({
  isModalOpen,
  onToggleFilter,
  onOpenCreateModal,
  isCreateModalOpen,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(true); // UI 텍스트 전용 상태
  const { isLoggedIn, logId } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (!isModalOpen && !isCreateModalOpen) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollToAllProducts();
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

  if (isModalOpen || isCreateModalOpen) return null;

  return (
    isVisible && (
      <div className="top-button-group">
        {isLoggedIn && logId === "admin" && (
          <button className="create-button" onClick={onOpenCreateModal}>
            상품 추가하기
          </button>
        )}
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
