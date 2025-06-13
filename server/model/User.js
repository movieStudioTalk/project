const db = require("../config/db");

exports.findById = async (userid) => {
  const [rows] = await db.query(
    "SELECT user_id FROM user_info WHERE user_id = ?",
    [userid]
  );
  return rows[0];
};

exports.insertUser = async (user) => {
  const { id, pw, name, type, ip } = user;
  const [result] = await db.query(
    "INSERT INTO user_info (user_id, user_pw, user_name,account_type,create_date,create_ip) VALUES (?, ?, ?,?,NOW(),?)",
    [id, pw, name, type, ip]
  );
  return result;
};
