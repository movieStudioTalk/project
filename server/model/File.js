const db = require("../config/db");

exports.insertFile = async (user) => {
  const {
    file_idx,
    file_sub_idx,
    file_name,
    file_uniq_name,
    file_path,
    mimetype,
    size,
    create_ip,
  } = user;
  const [result] = await db.query(
    "INSERT INTO file (file_idx, file_sub_idx, file_name, file_uniq_name, file_path, mimetype, file_size, create_date, create_ip) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?)",
    [
      file_idx,
      file_sub_idx,
      file_name,
      file_uniq_name,
      file_path,
      mimetype,
      size,
      create_ip,
    ]
  );
  return result;
};
