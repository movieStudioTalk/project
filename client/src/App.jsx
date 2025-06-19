import "./App.css";
import React, { useEffect, useState } from "react";
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
import api from "./js/api";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
                        showSpecial={true}
                        openProductModal={openProductModal}
                      />
                    </>
                  )}
                </div>
                <FAQ />
                <Footer />
                <TopButton
                  isModalOpen={isModalOpen}
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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
