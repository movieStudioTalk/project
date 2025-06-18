import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BestGoods from "./components/BestGoods";
import Features from "./components/Features";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./components/AuthContext";
import KakaoSuccess from "./components/KakaoSuccess";

function App() {
   return (
      <AuthProvider>
         <Router>
            <Header />
            <Routes>
               <Route
                  path="/"
                  element={
                     <>
                        <Hero />
                        <BestGoods />
                        <Features />
                        <Reviews />
                        <Footer />
                     </>
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
