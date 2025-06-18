// components/AllProductsSection.js
import React from "react";
import ProductCard from "./ProductCard";
import "./css/AllProducts.css";

function AllProducts({ items, setModalOpen }) {
   const handleClick = (item) => {
      // 예: 모달 열 때 선택한 아이템 전달 가능하게
      setModalOpen(true, item);
   };

   return (
      <section className="all-products-section">
         <h2 className="all-products-title">상품 전체보기</h2>
         <div className="all-products-grid">
            {items.map((item, index) => (
               <ProductCard
                  key={item.id || index}
                  item={item}
                  index={index}
                  onClick={handleClick}
               />
            ))}
         </div>
      </section>
   );
}

export default AllProducts;
