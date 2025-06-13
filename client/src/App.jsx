import "./App.css";
import heroImg from "./assets/hero.png";
import bearImg from "./assets/bear.png";
import bunnyImg from "./assets/bunny.png";
import turtleImg from "./assets/turtle.png";
import reviewImg from "./assets/review.png";
import cupImg from "./assets/cup.png";
import pouchImg from "./assets/pouch.png";
import chickImg from "./assets/chick.png";

function App() {
  return (
    <div className="container">
      <section className="hero">
        <img src={heroImg} alt="Main" className="hero-img" />
      </section>

      <section className="section best-goods">
        <h2>베스트 굿즈</h2>
        <div className="goods-grid">
          <div className="goods-card green">
            <img src={bearImg} alt="귀여움 폭" />
            <p>귀여움 폭</p>
          </div>
          <div className="goods-card yellow">
            <img src={bunnyImg} alt="한정만 구성" />
            <p>한정만 구성</p>
          </div>
          <div className="goods-card blue">
            <img src={turtleImg} alt="소장 가치 UP" />
            <p>소장 가치 UP</p>
          </div>
        </div>
      </section>

      <section className="section carousel">
        <button className="arrow">❮</button>
        <div className="carousel-items">
          <img src={bunnyImg} alt="item1" />
          <img src={cupImg} alt="item2" />
          <img src={pouchImg} alt="item3" />
          <img src={chickImg} alt="item4" />
        </div>
        <button className="arrow">❯</button>
      </section>

      <section className="section review-section">
        <div className="review">
          <h3>리뷰/후기</h3>
          <div className="review-box">
            너무 귀엽고 마음에 쏙 들어요! 배송도 빨라서 좋아~
          </div>
        </div>
        <div className="product-list">
          <h3>상품 리스트</h3>
          <div className="product-card">
            <div className="product-info">
              <img src={reviewImg} alt="product" className="product-icon" />
              <span>내엄 비석 곰</span>
            </div>
            <div className="product-price">
              <strong>38 000</strong>
              <button className="buy">구매하기</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
