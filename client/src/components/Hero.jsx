import React from "react";
import heroImg from "../images/hero.png";

const Hero = () => {
  return (
    <section className="hero">
      <img src={heroImg} alt="Hero" className="hero-img" />
      <h1>GOOD-PING 굿즈샵 오픈!</h1>
      <p>당신이 좋아하는 캐릭터들이 굿즈로 탄생했어요</p>
      <button>지금 구매하기</button>
    </section>
  );
};

export default Hero;
