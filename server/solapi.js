//solapi.js
const express = require("express");
const router = express.Router();
const { SolapiMessageService } = require("solapi");

const dotenv = require("dotenv");
// 환경변수 설정
dotenv.config();

const api_key = process.env.API_KEY || "";
const api_secret = process.env.API_SECRET || "";

const messageService = new SolapiMessageService(api_key, api_secret);

router.post("/send-message", async (req, res) => {
  const { name, text, tel, btn_url, disableSms } = req.query;
  try {
    const response = await messageService.send({
      to: tel,
      from: process.env.SOLAPI_PHONE,
      kakaoOptions: {
        pfId: process.env.SOLAPI_PFID,
        templateId: process.env.SOLAPI_TEMPLATE_ID,
        variables: {
          "#{name}": name,
          "#{text}": text,
          "#{btn_url}": btn_url,
        },
        disableSms: disableSms || false,
      },
    });
    res.json({
      success: true,
      mes: "알림톡전송성공",
      data: response,
    });
  } catch (error) {
    res.json({
      success: false,
      mes: "알림톡전송실패",
      error_mes: error,
      error: error.response?.status === 401 ? "인증실패" : "메세지 전송 실패",
    });
  }
});

module.exports = router;
