import React, { useState } from "react";
import ProductCard from "./ProductCard";
import "./css/AllProducts.css";

function AllProducts({ items, setModalOpen }) {
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 12;
   const pageCount = Math.ceil(items.length / itemsPerPage);

   // 페이지네이션 범위 계산 (5페이지씩 표시)
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

   // 네비게이션 핸들러
   const handlePageClick = (page) => setCurrentPage(page);
   const handleFirst = () => setCurrentPage(1);
   const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
   const handleNext = () => setCurrentPage((p) => Math.min(pageCount, p + 1));
   const handleLast = () => setCurrentPage(pageCount);

   // 현재 페이지 아이템
   const startIndex = (currentPage - 1) * itemsPerPage;
   const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

   return (
      <section className="all-products-section">
         <h2 className="all-products-title">상품 전체보기</h2>

         <div className="all-products-grid">
            {currentItems.map((item, idx) => (
               <div
                  key={item.id || idx}
                  onClick={() => setModalOpen(true, item)}
               >
                  <ProductCard item={item} index={idx} />
               </div>
            ))}
         </div>

         {pageCount > 1 && (
            <div className="all-products-pagination">
               <button onClick={handleFirst} disabled={currentPage === 1}>
                  처음
               </button>
               <button onClick={handlePrev} disabled={currentPage === 1}>
                  이전
               </button>

               {Array.from(
                  { length: endPage - startPage + 1 },
                  (_, i) => startPage + i
               ).map((page) => (
                  <button
                     key={page}
                     className={page === currentPage ? "active" : ""}
                     onClick={() => handlePageClick(page)}
                  >
                     {page}
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
