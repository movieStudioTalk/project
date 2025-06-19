import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Section from "./components/Section";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import TopButton from "./components/TopButton";
import AllProducts from "./components/AllProducts";
// import products from "./js/products";
import Login from "./components/Login";
import CreateModal from "./components/CreateModal";
import Modal from "./components/Modal";
import Register from "./components/Register";
import { AuthProvider } from "./components/AuthContext";
import KakaoSuccess from "./components/KakaoSuccess";
import Mypage from "./components/Mypage";

function App() {
  const [showAll, setShowAll] = useState(false); // ✅ 전체보기 토글 상태
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openProductModal = (item) => {
    setSelectedProduct(item);
    setShowModal(true);
  };

  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <div id="main">
                <Header />

                {/* ✅ 추가된 꾸미기 영역 시작 */}
                <section className="hero-banner">
                  <h2>지금 인기 굿즈를 만나보세요 🔥</h2>
                  <p>귀여움과 실용성 모두 갖춘 굿즈가 가득!</p>
                </section>

                <section className="features">
                  <div className="feature-card">🚚 무료배송</div>
                  <div className="feature-card">🎁 깜짝 할인</div>
                  <div className="feature-card">💳 간편 결제</div>
                </section>
                {/* ✅ 추가된 꾸미기 영역 끝 */}

                <div id="contents">
                  {showAll ? (
                    <AllProducts openProductModal={openProductModal} />
                  ) : (
                    <>
                      <Section
                        title="인기 상품"
                        showRank={true}
                        sectionId="popular"
                        openProductModal={openProductModal}
                      />
                      <Section
                        title="새로운 상품"
                        sectionId="new"
                        openProductModal={openProductModal}
                      />
                      <Section
                        title="단행본"
                        sectionId="readBook"
                        openProductModal={openProductModal}
                      />
                    </>
                  )}
                </div>
                <FAQ />
                <Footer />
                <TopButton
                  showModal={showModal}
                  onToggleFilter={() => setShowAll((prev) => !prev)} // ✅ 토글 전달
                  onOpenCreateModal={() => setIsCreateModalOpen(true)}
                />
                {isCreateModalOpen && (
                  <CreateModal onClose={() => setIsCreateModalOpen(false)} />
                )}

                {showModal && selectedProduct && (
                  <Modal
                    product={selectedProduct}
                    onClose={() => {
                      setShowModal(false);
                      setSelectedProduct(null);
                    }}
                  />
                )}
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/kakaoSuccess" element={<KakaoSuccess />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
