const express = require("express");
const router = express.Router();
const controller = require("../controller/User");

router.post("/userAdd", controller.postUserAdd);

module.exports = router;
