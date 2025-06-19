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
   const [showAll, setShowAll] = useState(false); // ✅ 전체보기 토글 상태
   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
   const [products, setProducts] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState(null);

   const openProductModal = (item) => {
      setSelectedProduct(item);
      setShowModal(true);
   };

   useEffect(() => {
      card();
   }, []);

   const card = async () => {
      try {
         const res = await api.get("/reserv/reservList", {});

         if (res.data.isSuccess) {
            console.log(res.data.map);
            setProducts(res.data.map);
         } else {
            alert(res.data.msg);
         }
      } catch (error) {
         console.error(error);
         alert("서버 오류가 발생했습니다.");
      }
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
                              <AllProducts
                                 openProductModal={openProductModal}
                              />
                           ) : (
                              <>
                                 <Section
                                    title="인기 상품"
                                    items={products}
                                    showRank={true}
                                    sectionId="popular"
                                    openProductModal={openProductModal}
                                 />
                                 <Section
                                    title="새로운 상품"
                                    items={products}
                                    sectionId="new"
                                    openProductModal={openProductModal}
                                 />
                                 <Section
                                    title="단행본"
                                    items={products}
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
                           <CreateModal
                              onClose={() => setIsCreateModalOpen(false)}
                           />
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
