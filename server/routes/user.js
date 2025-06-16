const express = require("express");
const router = express.Router();
const controller = require("../controller/User");

router.post("/userAdd", controller.postUserAdd);

router.post("/userLogin", controller.postUserLogin);
router.post("/userLogout", controller.postUserLogout);

router.get("/kakaoLogin", controller.postKakaoLogin);

router.get("/checkSession", controller.checkSession);

module.exports = router;
