import React, { useState } from "react";
import ProductCard from "./ProductCard";
import "./css/AllProducts.css";

function AllProducts({ items, openProductModal }) {
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

   return (
      <section className="all-products-section">
         <h2 className="all-products-title">상품 전체보기</h2>

         {/* 검색창 UI */}
         <div className="all-products-search">
            <input type="text" placeholder="상품명으로 검색" />
         </div>

         {/* 상품 그리드 */}
         <div className="all-products-grid">
            {currentItems.map((item, idx) => (
               <div
                  key={item.id || idx}
                  className="all-products-item"
                  onClick={() => openProductModal(true, item)}
               >
                  <ProductCard item={item} index={idx} />
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
