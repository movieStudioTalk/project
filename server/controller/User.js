const userModel = require("../model/user");
const axios = require("axios");

exports.postUserAdd = async (req, res) => {
  const { user_id, user_pw, user_name, user_phone, user_email, account_type } =
    req.body;
  const create_ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  try {
    const existingUser = await userModel.findById(user_id);
    if (existingUser) {
      return res.send({ isSuccess: false, msg: "이미 존재하는 아이디입니다." });
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

    if (count > 0) {
      req.session.user_id = user_id;
      req.session.user_name = user_name;
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
  const redirect_uri = "http://localhost:8080/user/kakaoLogin"; // 네 React 콜백 URI와 반드시 일치

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
    const userResponse = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

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
