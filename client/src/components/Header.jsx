import "./css/Header.css";
import bg1 from "../assets/bg1.jpg";
import bg2 from "../assets/bg2.png";
import bg3 from "../assets/bg3.png";
import { useEffect, useState } from "react";

const sliderImages = [bg1, bg2, bg3];

function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <div
        className="slides"
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {sliderImages.map((img, i) => (
          <div
            key={i}
            className="slide"
            style={{ backgroundImage: `url(${img})` }}
            onClick={() => console.log(`배경 클릭됨`)}
          ></div>
        ))}
      </div>

      <div className="pagination">
        {sliderImages.map((_, i) => (
          <button
            key={i}
            className={`dot ${currentIndex === i ? "active" : ""}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          ></button>
        ))}
      </div>

      <div className="overlay">
        <div className="center-text">
          <h1>웹툰 굿즈들을 이곳에서!</h1>
          <p>우리 함께 덕질해요</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
