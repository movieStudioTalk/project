import React, { useEffect, useState, useMemo } from "react";
import { SwiperSlide } from "swiper/react";
import CustomSwiper from "./CustomSwiper";
import Modal from "./Modal";
import ProductCard from "./ProductCard";
import "./css/Section.css";

function Section({
  title,
  items,
  showRank = false,
  sectionId,
  showSpecial = false,
  setModalOpen,
}) {
  const [itemsPerSlide, setItemsPerSlide] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      setItemsPerSlide(window.innerWidth >= 768 ? 4 : 2);
    };
    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const sortedItems = useMemo(() => {
    let filtered = [...items];

    if (sectionId === "readBook") {
      filtered = filtered.filter((item) => item.category === "book");
    }

    if (sectionId === "popular") {
      return filtered.sort((a, b) => b.sales - a.sales);
    } else if (sectionId === "new") {
      return filtered.sort(
        (a, b) => new Date(b.create_date) - new Date(a.create_date)
      );
    }

    return filtered;
  }, [items, sectionId]);

  const limitedItems = sortedItems.slice(0, 8);

  const groupedItems = [];
  for (let i = 0; i < limitedItems.length; i += itemsPerSlide) {
    groupedItems.push(limitedItems.slice(i, i + itemsPerSlide));
  }

  const openModal = (item) => {
    console.log(item);
    setSelectedProduct(item);
    setShowModal(true);
    setModalOpen?.(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalOpen?.(false);
  };

  return (
    <section id={sectionId} className="slider-section">
      <h2 className="section-title">{title}</h2>
      <CustomSwiper className="section-swiper">
        {groupedItems.map((group, idx) => (
          <SwiperSlide key={idx}>
            <div className="slide-row">
              {group.map((item, i) => {
                const index = idx * itemsPerSlide + i;
                return (
                  <ProductCard
                    key={item.idx}
                    item={item}
                    index={index}
                    showRank={showRank}
                    showSpecial={showSpecial}
                    onClick={openModal}
                  />
                );
              })}
              {group.length < itemsPerSlide &&
                Array.from({
                  length: itemsPerSlide - group.length,
                }).map((_, i) => (
                  <div key={`empty-${i}`} className="product-card empty-card" />
                ))}
            </div>
          </SwiperSlide>
        ))}
      </CustomSwiper>

      {showModal && selectedProduct && (
        <Modal product={selectedProduct} onClose={closeModal} />
      )}
    </section>
  );
}

export default Section;
