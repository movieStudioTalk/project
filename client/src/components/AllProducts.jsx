// components/AllProductsSection.js
import React, { useEffect, useState, useRef } from "react";
import ProductCard from "./ProductCard";
import api from "../js/api";
import "./css/AllProducts.css";

function AllProducts({ openProductModal }) {
   const [items, setItems] = useState([]);
   const [inputValue, setInputValue] = useState("");
   const isComposing = useRef(false);

   const handleClick = (item) => {
      // 예: 모달 열 때 선택한 아이템 전달 가능하게
      openProductModal(true, item);
   };

   useEffect(() => {
      card();
   }, []);

   const card = async () => {
      try {
         const res = await api.get("/reserv/reservList", {
            params: { sectionId: "board" },
         });

         if (res.data.isSuccess) {
            setItems(res.data.map);
         } else {
            alert(res.data.msg);
         }
      } catch (error) {
         console.error(error);
         alert("서버 오류가 발생했습니다.");
      }
   };

   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 12;
   const pageCount = Math.ceil(items.length / itemsPerPage);

   // 페이지네이션 범위 계산 (5개씩 표시)
   const pagesToShow = 5;
   const half = Math.floor(pagesToShow / 2);
   let startPage = currentPage - half;
   let endPage = currentPage + half;
   if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(pagesToShow, pageCount);
   }
   if (endPage > pageCount) {
      endPage = pageCount;
      startPage = Math.max(1, pageCount - pagesToShow + 1);
   }
   const visiblePages = [];
   for (let p = startPage; p <= endPage; p++) visiblePages.push(p);

   // 핸들러
   const handleFirst = () => setCurrentPage(1);
   const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
   const handlePage = (p) => setCurrentPage(p);
   const handleNext = () => setCurrentPage((p) => Math.min(pageCount, p + 1));
   const handleLast = () => setCurrentPage(pageCount);

   // 현재 페이지 아이템
   const startIndex = (currentPage - 1) * itemsPerPage;
   const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

   const searchChange = async (value) => {
      try {
         const res = await api.get("/reserv/reservList", {
            params: { searchValue: value },
         });

         setItems(res.data.map);
      } catch (error) {
         console.error(error);
         alert("서버 오류가 발생했습니다.");
      }
   };

   return (
      <section className="all-products-section" id="allProducts">
         <h2 className="all-products-title">상품 전체보기</h2>

         {/* 검색창 UI */}
         <div className="all-products-search">
            <input
               type="text"
               placeholder="상품명으로 검색"
               value={inputValue}
               onChange={(e) => {
                  setInputValue(e.target.value);
                  if (!isComposing.current) {
                     searchChange(e.target.value);
                  }
               }}
               onCompositionStart={() => {
                  isComposing.current = true;
               }}
               onCompositionEnd={(e) => {
                  isComposing.current = false;
                  searchChange(e.target.value);
               }}
            />
         </div>

         {/* 상품 그리드 */}
         <div className="all-products-grid">
            {currentItems.map((item, idx) => (
               <div
                  key={item.id || idx}
                  className="all-products-item"
                  onClick={() => openProductModal(item, true)}
               >
                  <ProductCard item={item} index={idx} onClick={handleClick} />
               </div>
            ))}
         </div>

         {/* 페이지네이션 */}
         {pageCount > 1 && (
            <div className="all-products-pagination">
               <button onClick={handleFirst} disabled={currentPage === 1}>
                  처음
               </button>
               <button onClick={handlePrev} disabled={currentPage === 1}>
                  이전
               </button>
               {visiblePages.map((p) => (
                  <button
                     key={p}
                     className={p === currentPage ? "active" : ""}
                     onClick={() => handlePage(p)}
                  >
                     {p}
                  </button>
               ))}
               <button
                  onClick={handleNext}
                  disabled={currentPage === pageCount}
               >
                  다음
               </button>
               <button
                  onClick={handleLast}
                  disabled={currentPage === pageCount}
               >
                  마지막
               </button>
            </div>
         )}
      </section>
   );
}

export default AllProducts;
