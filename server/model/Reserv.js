const db = require("../config/db");

exports.insertReserv = async (user) => {
  const { file_idx, title, price, category, create_ip } = user;
  const [result] = await db.query(
    "INSERT INTO reservation (file_idx, title, price, category, create_date, create_ip) VALUES (?, ?, ?, ?, NOW(), ?)",
    [file_idx, title, price, category, create_ip]
  );
  return result;
};

exports.selectReservList = async () => {
  const [result] = await db.query(
    "SELECT a.idx,a.file_idx,a.title,a.price,a.category,a.inventory,a.create_date,GROUP_CONCAT(b.file_path ORDER BY b.file_sub_idx ASC) AS file_paths FROM reservation a LEFT JOIN file b ON a.file_idx = b.file_idx GROUP BY a.idx, a.title ORDER BY idx desc"
  );
  return result;
};
