import React from "react";
import reviewImg from "../images/review.png";

const Reviews = () => {
  return (
    <section className="reviews">
      <h2>구매자 리뷰</h2>
      <div className="review-content">
        <img src={reviewImg} alt="리뷰" />
        <div className="review-text">
          "퀄리티가 정말 좋아요! 선물용으로 강추합니다."
        </div>
      </div>
    </section>
  );
};

export default Reviews;
