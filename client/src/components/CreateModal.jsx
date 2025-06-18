import React, { useEffect, useRef, useState } from "react";
import "./css/CreateModal.css";

const CreateModal = ({ onClose }) => {
   const modalRef = useRef(null);
   const [name, setName] = useState("");
   const [price, setPrice] = useState("");
   const [images, setImages] = useState([]);
   const [productType, setProductType] = useState("normal"); // 추가: 상품 유형 상태

   useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
         document.body.style.overflow = "auto";
      };
   }, []);

   const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
         onClose();
      }
   };

   useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      if (files.length + images.length > 10) {
         alert("이미지는 최대 10장까지 업로드할 수 있습니다.");
         return;
      }
      const newImages = files.map((file) => ({
         file,
         url: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newImages]);
   };

   const removeImage = (index) => {
      const updated = [...images];
      updated.splice(index, 1);
      setImages(updated);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      // 실제 업로드 로직 연결 필요
      console.log("상품명:", name);
      console.log("가격:", price);
      console.log("상품 유형:", productType);
      console.log(
         "이미지:",
         images.map((img) => img.file)
      );
      onClose(); // 모달 닫기
   };

   return (
      <div className="create-modal-overlay">
         <div className="create-modal" ref={modalRef}>
            {/* 닫기 버튼 추가 */}
            <button className="close-button" onClick={onClose}>
               &times;
            </button>

            <h2>상품 추가</h2>
            <form onSubmit={handleSubmit}>
               {/* 상품 유형 선택 추가 */}
               <div className="product-type">
                  <label>
                     <input
                        type="radio"
                        name="productType"
                        value="normal"
                        checked={productType === "normal"}
                        onChange={() => setProductType("normal")}
                     />
                     일반
                  </label>
                  <label>
                     <input
                        type="radio"
                        name="productType"
                        value="book"
                        checked={productType === "book"}
                        onChange={() => setProductType("book")}
                     />
                     단행본
                  </label>
               </div>
               <input
                  type="text"
                  placeholder="상품 이름"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
               />
               <input
                  type="number"
                  placeholder="상품 가격"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
               />

               <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
               />
               <div className="image-preview">
                  {images.map((img, index) => (
                     <div key={index} className="image-thumb">
                        <img src={img.url} alt={`preview-${index}`} />
                        <button
                           type="button"
                           onClick={() => removeImage(index)}
                        >
                           ✕
                        </button>
                     </div>
                  ))}
               </div>
               <button type="submit" className="submit-btn">
                  등록
               </button>
            </form>
         </div>
      </div>
   );
};

export default CreateModal;
