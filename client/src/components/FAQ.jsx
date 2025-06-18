// src/components/FAQ.jsx
import React from "react";
import "./css/FAQ.css";

const FAQ_DATA = [
   {
      question: "배송은 얼마나 걸리나요?",
      answer: "평균 2-3일 이내 도착합니다.",
   },
   {
      question: "교환/환불 정책은?",
      answer: "상품 수령 후 7일 이내 교환/환불 가능.",
   },
   {
      question: "사전 예약은 언제 배송되나요?",
      answer: "출시 즉시 일괄 발송됩니다.",
   },
];

const FAQ = () => (
   <section id="faq" className="faq-section">
      <h2 className="faq-title">자주 묻는 질문</h2>
      <div className="faq-list">
         {FAQ_DATA.map(({ question, answer }, idx) => (
            <details key={idx} className="faq-item">
               <summary className="faq-question">{question}</summary>
               <p className="faq-answer">{answer}</p>
            </details>
         ))}
      </div>
   </section>
);

export default FAQ;
