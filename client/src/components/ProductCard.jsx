import React from "react";
import "./css/ProductCard.css"; // 필요하면 별도 스타일 분리 가능

function ProductCard({
  item,
  index,
  showRank = false,
  showSpecial = false,
  onClick,
}) {
  return (
    <div
      className="product-card"
      onClick={() => onClick(item)}
      style={{ cursor: "pointer" }}
    >
      <div className="image-wrapper">
        <img src={item.file_paths[0]} />
        {showRank && index < 3 && (
          <div className={`rank-badge rank-${index + 1}`}>{index + 1}위</div>
        )}
        {showSpecial && item.isSpecial && (
          <div className="special-icon special-star" title="별">
            ⭐
          </div>
        )}
      </div>

      <div className="info">
        <p className="name">{item.title}</p>
        <p className="price">{item.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
