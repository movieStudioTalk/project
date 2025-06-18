const products = [
   {
      id: 1,
      name: "상품 이름 1",
      price: "₩19,800",
      isSpecial: true,
      sales: 150, // 구매 수
      date: "2025-06-10", // 등록일
      images: [
         "https://shop-phinf.pstatic.net/20250529_41/1748511015944HOq31_JPEG/77602187184857400_860440080.jpg?type=m510",
         "https://example.com/image2.jpg",
      ],
   },
   {
      id: 2,
      name: "상품 이름 2",
      price: "₩25,000",
      sales: 160, // 구매 수
      date: "2025-06-11", // 등록일
      category: "book",
      images: [
         "https://example.com/image1.jpg",
         "https://example.com/image2.jpg",
      ],
   },
   {
      id: 3,
      name: "상품 이름 3",
      price: "₩17,500",
      sales: 170, // 구매 수
      date: "2025-06-12", // 등록일
      images: [
         "https://example.com/image1.jpg",
         "https://example.com/image2.jpg",
      ],
   },
   {
      id: 4,
      name: "상품 이름 4",
      price: "₩22,000",
      isSpecial: true,
      sales: 180, // 구매 수
      date: "2025-06-13", // 등록일
      category: "book",
      images: [
         "https://example.com/image1.jpg",
         "https://example.com/image2.jpg",
      ],
   },
   {
      id: 5,
      name: "상품 이름 5",
      price: "₩18,000",
      sales: 190, // 구매 수
      date: "2025-06-14", // 등록일
      images: [
         "https://example.com/image1.jpg",
         "https://example.com/image2.jpg",
      ],
   },
   {
      id: 6,
      name: "[단행본] 서울 자가에 대기업 다니는 김 부장 이야기 Vol.1-2 세트",
      price: "₩36,000",
      sales: 200, // 구매 수
      date: "2025-04-11", // 등록일
      category: "book",
      images: [
         "https://shop-phinf.pstatic.net/20250415_31/1744694041427KjY3A_JPEG/11307545797095503_1741477524.jpg?type=m510",
         "https://shop-phinf.pstatic.net/20250415_46/1744694049835k1nox_JPEG/507449968140761_722963429.jpg?type=m510",
      ],
   },
   {
      id: 7,
      name: "청춘계시록 청아&요한 섬유 향수 2종 / 하트 목걸이 단품",
      price: "₩28,000",
      isSpecial: true,
      sales: 340, // 구매 수
      date: "2025-06-17", // 등록일
      images: [
         "https://shop-phinf.pstatic.net/20250611_27/1749622312184rfjnd_JPEG/83755164746994026_1480555041.jpg?type=m510",
         "https://shop-phinf.pstatic.net/20250611_232/1749622318264EV4S2_JPEG/100566187182395493_1041145451.jpg?type=m510",
         "https://shop-phinf.pstatic.net/20250611_257/1749622318721hK17y_JPEG/100566187628832707_920661881.jpg?type=m510",
         "https://shop-phinf.pstatic.net/20250611_39/1749622319328dsAMX_JPEG/100566188236011311_832299261.jpg?type=m510",
         "https://shop-phinf.pstatic.net/20250611_221/1749622319852CWdkx_JPEG/100566188753084719_1517603299.jpg?type=m510",
         "https://shop-phinf.pstatic.net/20250611_117/1749622320351A9eVq_JPEG/100566189256163780_1404226243.jpg?type=m510",
         "https://shop-phinf.pstatic.net/20250611_136/1749622320817Ryx60_JPEG/100566189728410050_2132681148.jpg?type=m510",
         "https://shop-phinf.pstatic.net/20250611_203/1749622321267rCFhn_JPEG/100566190181487909_655174049.jpg?type=m510",
         "https://shop-phinf.pstatic.net/20250611_177/174962232181127gAx_JPEG/100566190722359382_1259518410.jpg?type=m510",
         "https://shop-phinf.pstatic.net/20250611_136/1749622322243WTtsw_JPEG/100566191139230663_838047539.jpg?type=m510",
      ],
   },
   {
      id: 8,
      name: "상품 이름 8",
      price: "₩23,500",
      sales: 220, // 구매 수
      date: "2025-06-17", // 등록일
      category: "book",
      images: [
         "https://example.com/image1.jpg",
         "https://example.com/image2.jpg",
      ],
   },
   {
      id: 9,
      name: "별정직 공무원 입사키트",
      price: "₩29,800",
      sales: 350, // 구매 수
      date: "2025-06-07", // 등록일
      images: [
         "https://shop-phinf.pstatic.net/20250529_160/1748511010939L4WLR_JPEG/77602182164623136_259453453.jpg?type=m510",
         "https://shop-phinf.pstatic.net/20250529_41/1748511015944HOq31_JPEG/77602187184857400_860440080.jpg?type=m510",
         "https://shop-phinf.pstatic.net/20250529_167/1748511016449ihAEP_JPEG/77602187692974470_690254781.jpg?type=m510",
         "https://shop-phinf.pstatic.net/20250529_240/1748511016939cK0zF_JPEG/77602188185144490_1063428075.jpg?type=m510",
         "https://shop-phinf.pstatic.net/20250529_185/1748511017690xzjCB_JPEG/77602188939945500_967925644.jpg?type=m510",
         "https://shop-phinf.pstatic.net/20250529_56/1748511018211jfRNK_JPEG/77602189466883633_49878366.jpg?type=m510",
         "https://shop-phinf.pstatic.net/20250529_20/1748511018746xBlcI_JPEG/77602190000969098_1945303460.jpg?type=m510",
      ],
   },
   {
      id: 10,
      name: "상품 이름 10",
      price: "₩23,500",
      sales: 100, // 구매 수
      date: "2025-06-29", // 등록일
      category: "book",
      images: [
         "https://example.com/image1.jpg",
         "https://example.com/image2.jpg",
      ],
   },
];

export default products;
