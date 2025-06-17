const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();
const controller = require("../controller/Reserv");

//굿즈 목록생성
router.post("/reservAdd", upload.array("files", 10), controller.postReservAdd);

module.exports = router;
