// components/AllProductsSection.js
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import api from "../js/api";
import "./css/AllProducts.css";

function AllProducts({ setModalOpen }) {
  const [items, setItems] = useState([]);

  const handleClick = (item) => {
    // 예: 모달 열 때 선택한 아이템 전달 가능하게
    setModalOpen(true, item);
  };

  useEffect(() => {
    card();
  }, []);

  const card = async () => {
    try {
      const res = await api.get("/reserv/reservList", {});

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

  return (
    <section className="all-products-section" id="allProducts">
      <h2 className="all-products-title">상품 전체보기</h2>
      <div className="all-products-grid">
        {items.map((item, index) => (
          <ProductCard
            key={item.idx || index}
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
