const express = require("express");
const router = express.Router();
const controller = require("../controller/User");

//회원가입
router.post("/userAdd", controller.postUserAdd);

//로그인
router.post("/userLogin", controller.postUserLogin);
router.post("/userLogout", controller.postUserLogout);

//카카오 로그인
router.get("/kakaoLogin", controller.postKakaoLogin);

//로그인세션
router.get("/checkSession", controller.checkSession);

module.exports = router;
