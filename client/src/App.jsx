import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Section from "./components/Section";
import Footer from "./components/Footer";
import TopButton from "./components/TopButton";
import AllProducts from "./components/AllProducts";
import products from "./js/products";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./components/AuthContext";
import KakaoSuccess from "./components/KakaoSuccess";
import Nav from "./components/Nav";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false); // ✅ 전체보기 토글 상태
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <div id="main">
                <Header />
                <div id="contents">
                  {showAll ? (
                    <AllProducts
                      items={products}
                      setModalOpen={setIsModalOpen}
                    />
                  ) : (
                    <>
                      <Section
                        title="인기 상품"
                        items={products}
                        showRank={true}
                        sectionId="popular"
                        setModalOpen={setIsModalOpen}
                      />
                      <Section
                        title="새로운 상품"
                        items={products}
                        sectionId="new"
                        setModalOpen={setIsModalOpen}
                      />
                      <Section
                        title="단행본"
                        items={products}
                        sectionId="readBook"
                        showSpecial={true}
                        setModalOpen={setIsModalOpen}
                      />
                    </>
                  )}
                </div>
                <Footer />
                <TopButton
                  isModalOpen={isModalOpen}
                  onToggleFilter={() => setShowAll((prev) => !prev)} // ✅ 토글 전달
                />
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
