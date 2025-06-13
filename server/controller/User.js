const userModel = require("../model/user");

exports.postUserAdd = async (req, res) => {
  const { userId, password, userName, accountType } = req.query;
  const create_ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  try {
    const existingUser = await userModel.findById(userId);
    if (existingUser) {
      return res.send({ isSuccess: false, msg: "이미 존재하는 아이디입니다." });
    }

    await userModel.insertUser({
      id: userId,
      pw: password,
      name: userName,
      type: accountType,
      ip: create_ip,
    });

    res.send({ isSuccess: true, msg: `${userName}님 회원가입 완료!` });
  } catch (err) {
    console.error(err);
    res.status(500).send({ isSuccess: false, msg: "서버 오류" });
  }
};
