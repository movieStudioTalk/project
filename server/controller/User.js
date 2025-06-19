const userModel = require("../model/user");
const nodemailer = require("nodemailer");
const axios = require("axios");
require("dotenv").config();

exports.postUserAdd = async (req, res) => {
   const { user_id, user_pw, user_name, user_phone, user_email, account_type } =
      req.body;
   const create_ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

   try {
      const existingUser = await userModel.findById(user_id);
      if (existingUser) {
         return res.send({
            isSuccess: false,
            msg: "이미 존재하는 아이디입니다.",
         });
      }

      await userModel.insertUser({
         id: user_id,
         pw: user_pw,
         name: user_name,
         phone: user_phone,
         type: account_type,
         email: user_email,
         ip: create_ip,
      });

      res.send({ isSuccess: true, msg: `${user_name}님 회원가입 완료!` });
   } catch (err) {
      console.error(err);
      res.status(500).send({ isSuccess: false, msg: "서버 오류" });
   }
};

exports.postUserLogin = async (req, res) => {
   const { user_id, user_pw } = req.body;

   try {
      const userCnt = await userModel.selectUserLogin({
         id: user_id,
         pw: user_pw,
      });

      const userName = await userModel.selectUserName({
         id: user_id,
         pw: user_pw,
      });

      const count = userCnt[0]["COUNT(*)"];

      const user_name = userName[0]["user_name"];

      const account_type = userName[0]["account_type"];

      if (count > 0) {
         req.session.user_id = user_id;
         req.session.user_name = user_name;
         req.session.account_type = account_type;
         res.send({ isSuccess: true, msg: "로그인 완료!" });
      } else {
         res.send({ isSuccess: false, msg: "계정이 존재하지 않습니다." });
      }
   } catch (err) {
      console.error(err);
      res.status(500).send({ isSuccess: false, msg: "서버 오류" });
   }
};

exports.postUserLogout = (req, res) => {
   req.session.destroy();
   res.send({ isSuccess: true, msg: "로그아웃 완료" });
};

exports.checkSession = (req, res) => {
   if (req.session.user_id) {
      res.send({
         isLoggedIn: true,
         user_id: req.session.user_id,
         user_name: req.session.user_name,
         account_type: req.session.account_type,
      });
   } else {
      res.send({ isLoggedIn: false });
   }
};

exports.postKakaoLogin = async (req, res) => {
   const code = req.query.code;

   if (!code) {
      return res.status(400).json({ isSuccess: false, msg: "코드 누락" });
   }

   const client_id = "eff5a79672835d8e1007a61e5faecbd4";
   //로컬
   const redirect_uri = "http://localhost:8080/user/kakaoLogin"; // 네 React 콜백 URI와 반드시 일치
   //운영
   // const redirect_uri = "http://192.168.0.63:8080/user/kakaoLogin"; // 네 React 콜백 URI와 반드시 일치

   try {
      // 1️⃣ access_token 발급 요청
      const tokenResponse = await axios.post(
         "https://kauth.kakao.com/oauth/token",
         new URLSearchParams({
            grant_type: "authorization_code",
            client_id: client_id,
            redirect_uri: redirect_uri,
            code: code,
         }),
         {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
         }
      );

      const access_token = tokenResponse.data.access_token;
      console.log(access_token);

      // 2️⃣ 사용자 정보 요청
      const userResponse = await axios.get(
         "https://kapi.kakao.com/v2/user/me",
         {
            headers: {
               Authorization: `Bearer ${access_token}`,
            },
         }
      );

      const user = userResponse.data;

      // 3️⃣ 여기서 DB 저장 가능 (예제: 그냥 로그 출력)
      console.log("카카오 사용자 정보:", user);

      const kakao_id = user.id;
      const email = user.kakao_account?.email || "";
      const nickname = user.kakao_account?.profile?.nickname || "";
      const type = "kakao";
      const create_ip =
         req.headers["x-forwarded-for"] || req.socket.remoteAddress;

      let user_cnt = await userModel.kakaoId(kakao_id);
      const count = user_cnt[0]["COUNT(*)"];

      if (count == 0) {
         // 최초 로그인시 DB 저장
         user = await userModel.kakaoCreate({
            kakao_id,
            nickname,
            email,
            type,
            create_ip,
         });
      }

      let user_cnt2 = await userModel.kakaoId(kakao_id);
      const count2 = user_cnt2[0]["COUNT(*)"];

      if (count2 > 0) {
         req.session.isLoggedIn = true;
         req.session.user_id = kakao_id;
         req.session.user_name = nickname;
      }

      // return res.json({
      //   isSuccess: true,
      //   kakao_id,
      //   email,
      //   nickname,
      // });

      return res.redirect("http://localhost:5173/kakaoSuccess");
   } catch (err) {
      console.error("카카오 로그인 실패", err.response?.data || err);
      return res
         .status(500)
         .json({ isSuccess: false, msg: "카카오 로그인 실패" });
   }
};

exports.checkAlarm = async (req, res) => {
   const user_id = req.session.user_id;
   const user_name = req.session.user_name;

   try {
      let user_yn = await userModel.findUserSubscribe(user_id);

      if (user_yn == "Y") {
         user_yn = "N";
         await userModel.updateUserSubscribe({ user_id, user_yn });
         res.send({
            isSuccess: false,
            msg: user_name + "님 구독취소하였습니다.",
         });
      } else if (user_yn == "N") {
         user_yn = "Y";
         await userModel.updateUserSubscribe({ user_id, user_yn });
         res.send({ isSuccess: true, msg: user_name + "님 구독하였습니다." });
      }
   } catch (err) {
      console.error(err);
      res.status(500).send({ isSuccess: false, msg: "서버 오류" });
   }
};

exports.getCheckAlarm = async (req, res) => {
   const user_id = req.session.user_id;

   try {
      let user_cnt = await userModel.UserSubscribeCnt(user_id);
      console.log(user_cnt);
      if (user_cnt > 0) {
         res.send({ isSuccess: true, msg: "이미 구독되어있습니다." });
      } else {
         res.send({ isSuccess: false, msg: "구독하시겠습니까?" });
      }
   } catch (err) {
      console.error(err);
      res.status(500).send({ isSuccess: false, msg: "서버 오류" });
   }
};

exports.getMypageInfo = async (req, res) => {
   const user_id = req.session.user_id;

   try {
      let user_info = await userModel.getUserInfo(user_id);
      if (user_info) {
         res.send({ isSuccess: true, info: user_info });
      } else {
         res.send({ isSuccess: false, info: null });
      }
   } catch (err) {
      console.error(err);
      res.status(500).send({ isSuccess: false, msg: "서버 오류" });
   }
};

exports.postEmailCert = async (req, res) => {
   const { user_email } = req.body;

   const code = Math.floor(100000 + Math.random() * 900000);

   try {
      // 이메일 전송 설정
      const transporter = nodemailer.createTransport({
         host: "smtp.gmail.com",
         port: 465, // SSL 포트
         secure: true, // SSL 사용
         auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PW,
         },
      });

      // 메일 내용
      let mailOptions = {
         from: '"GOOD-PING" <GOOD-PING@gmail.com>',
         to: user_email,
         subject: "GOOD-PING 이메일 인증코드",
         text: `인증코드는 [${code}] 입니다.`,
      };

      await transporter.sendMail(mailOptions);

      // 클라이언트에 코드 전송 (보안상 실제로는 세션에 저장하거나 백엔드에서 검증)
      res.send({
         isSuccess: true,
         code: code,
         msg: "인증 이메일이 발송되었습니다.",
      });
   } catch (err) {
      console.error(err);
      res.status(500).send({ isSuccess: false, msg: "메일 전송 실패" });
   }
};
