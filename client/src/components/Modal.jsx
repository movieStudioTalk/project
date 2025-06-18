import React, { useState, useEffect } from "react";
import "./css/Modal.css";

function Modal({ product, onClose }) {
   const [mainImage, setMainImage] = useState(product.images[0]);
   const [form, setForm] = useState({
      name: "",
      zip_code: "",
      address: "",
      address_at: "",
      phone: "",
   });

   // ✅ 스크롤 막기 처리
   useEffect(() => {
      document.body.style.overflow = "hidden"; // 스크롤 막기
      return () => {
         document.body.style.overflow = ""; // 복구
      };
   }, []);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
   };

   const handleBuy = () => {
      alert(
         `구매 요청됨!\n이름: ${form.name}\n주소: ${form.address}\n전화번호: ${form.phone}`
      );
      onClose();
   };

   function zipCode() {
      try {
         new window.daum.Postcode({
            oncomplete: function (data) {
               const zipcode = data.zonecode;
               const addr = data.address;

               setForm((prev) => ({
                  ...prev,
                  zip_code: zipcode,
                  address: addr,
               }));
            },
         }).open();
      } catch (e) {
         alert("주소검색 중 오류 발생");
         console.error(e);
      }
   }

   return (
      <div className="modal-overlay" onClick={onClose}>
         <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            {/* 닫기 버튼 추가 */}
            <button className="close-button" onClick={onClose}>
               &times;
            </button>

            {/* 왼쪽: 이미지 뷰 */}
            <div className="modal-left">
               <div className="main-image">
                  <img src={mainImage} alt="선택 이미지" />
               </div>
               <div className="thumbnail-list">
                  {product.images.map((img, idx) => (
                     <img
                        key={idx}
                        src={img}
                        alt={`썸네일 ${idx}`}
                        className={img === mainImage ? "active" : ""}
                        onClick={() => setMainImage(img)}
                     />
                  ))}
               </div>
            </div>

            {/* 오른쪽: 상품 정보 및 입력 */}
            <div className="modal-right">
               <h2 className="detailName">{product.name}</h2>
               <p className="detailPrice">{product.price}</p>

               <form className="order-form">
                  <input
                     type="text"
                     name="name"
                     placeholder="이름"
                     value={form.name}
                     onChange={handleChange}
                  />
                  <div>
                     <input
                        type="text"
                        name="zip_code"
                        placeholder="우편번호"
                        value={form.zip_code}
                        onChange={handleChange}
                        readOnly
                     />
                     <button
                        type="button"
                        onClick={zipCode}
                        className="zipButton"
                     >
                        주소검색
                     </button>
                  </div>
                  <input
                     type="text"
                     name="address"
                     placeholder="주소"
                     value={form.address}
                     onChange={handleChange}
                     readOnly
                  />
                  <input
                     type="text"
                     name="address_at"
                     placeholder="상세주소"
                     value={form.address_at}
                     onChange={handleChange}
                  />
                  <input
                     type="text"
                     name="phone"
                     placeholder="전화번호"
                     value={form.phone}
                     onChange={handleChange}
                  />
                  <button type="button" onClick={handleBuy} id="buyButton">
                     구매하기
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default Modal;
