import React from "react";
import Slider from "react-slick";
import bearImg from "../images/bear.png";
import bunnyImg from "../images/bunny.png";
import turtleImg from "../images/turtle.png";

const BestGoods = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768, // 모바일 대응
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="best-goods">
      <h2>베스트 굿즈</h2>
      <Slider {...settings} className="goods-slider">
        <div className="goods-wrap">
          <div className="goods-card">
            <img src={bearImg} alt="곰 인형" />
            <p>곰돌이 인형</p>
          </div>
        </div>
        <div className="goods-wrap">
          <div className="goods-card">
            <img src={bunnyImg} alt="토끼 키링" />
            <p>토끼 키링</p>
          </div>
        </div>
        <div className="goods-wrap">
          <div className="goods-card">
            <img src={turtleImg} alt="거북이 쿠션" />
            <p>거북이 쿠션</p>
          </div>
        </div>
      </Slider>
    </section>
  );
};

export default BestGoods;
