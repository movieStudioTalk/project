const db = require("../config/db");

exports.insertReserv = async (user) => {
  const { file_idx, title, price, create_ip } = user;
  const [result] = await db.query(
    "INSERT INTO reservation (file_idx, title, price, create_date, create_ip) VALUES (?, ?, ?, NOW(), ?)",
    [file_idx, title, price, create_ip]
  );
  return result;
};
