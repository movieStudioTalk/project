const db = require("../config/db");

exports.findById = async (userid) => {
  const [rows] = await db.query(
    "SELECT user_id FROM user_info WHERE user_id = ?",
    [userid]
  );
  return rows[0];
};

exports.insertUser = async (user) => {
  const { id, pw, name, email, type, ip } = user;
  const [result] = await db.query(
    "INSERT INTO user_info (user_id, user_pw, user_name, user_email, account_type, create_date, create_ip) VALUES (?, ?, ?, ?, ?, NOW(), ?)",
    [id, pw, name, email, type, ip]
  );
  return result;
};

exports.selectUserLogin = async (user) => {
  const { id, pw } = user;
  const [result] = await db.query(
    "SELECT COUNT(*) FROM user_info WHERE user_id = ? AND user_pw = ? AND account_type = 'home'",
    [id, pw]
  );
  return result;
};

exports.selectUserName = async (user) => {
  const { id, pw } = user;
  const [result] = await db.query(
    "SELECT user_name FROM user_info WHERE user_id = ? AND user_pw = ?",
    [id, pw]
  );
  return result;
};

exports.kakaoId = async (kakao_id) => {
  const [result] = await db.query(
    "SELECT COUNT(*) FROM user_info WHERE user_id = ? AND account_type = 'kakao'",
    [kakao_id]
  );
  return result;
};

exports.kakaoCreate = async (user) => {
  const { kakao_id, nickname, email, type, create_ip } = user;
  const [result] = await db.query(
    "INSERT INTO user_info (user_id, user_pw, user_name, user_email, account_type, create_date, create_ip) VALUES (?, ?, ?, ?, ?, NOW(), ?)",
    [kakao_id, kakao_id, nickname, email, type, create_ip]
  );
  return result;
};
