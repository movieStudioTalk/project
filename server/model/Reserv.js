const db = require("../config/db");

exports.insertReserv = async (user) => {
  const { file_idx, title, price, category, create_ip } = user;
  const [result] = await db.query(
    "INSERT INTO reservation (file_idx, title, price, category, create_date, create_ip) VALUES (?, ?, ?, ?, NOW(), ?)",
    [file_idx, title, price, category, create_ip]
  );
  return result;
};

exports.selectReservList = async (text) => {
  const { sectionId, searchValue } = text;
  let query = `
      SELECT 
        a.idx,
        a.file_idx,
        a.title,
        a.price,
        a.category,
        a.inventory,
        a.create_date,
        GROUP_CONCAT(b.file_path ORDER BY b.file_sub_idx ASC) AS file_paths `;

  if (sectionId == "popular") {
    query += `,(SELECT COUNT(*) 
                  FROM reservation_info ri 
                  WHERE ri.rev_idx = a.idx
                ) AS sales `;
  }

  query += `FROM reservation a 
            LEFT JOIN file b ON a.file_idx = b.file_idx `;
  if (searchValue !== undefined || searchValue !== "") {
    query += `WHERE a.title LIKE '%${searchValue}%' `;
  }
  query += `GROUP BY a.idx, a.title `;

  if (sectionId == "popular") {
    query += `ORDER BY sales DESC, a.idx DESC
        LIMIT 8`;
  } else {
    query += `ORDER BY a.idx DESC`;
  }

  const [result] = await db.query(query);
  return result;
};

exports.insertReservPurchase = async (user) => {
  const {
    rev_idx,
    user_id,
    user_name,
    zip_code,
    address,
    address_at,
    phone,
    create_ip,
  } = user;
  const [result] = await db.query(
    "INSERT INTO reservation_info (rev_idx, user_id, user_name, zip_code, address, address_at, user_phone, create_date, create_ip) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?)",
    [
      rev_idx,
      user_id,
      user_name,
      zip_code,
      address,
      address_at,
      phone,
      create_ip,
    ]
  );
  return result;
};

exports.selectMypageInfo = async (userid) => {
  const [rows] = await db.query(
    "SELECT * FROM reservation_info a LEFT JOIN reservation b ON a.rev_idx = b.idx WHERE user_id = ?",
    [userid]
  );
  return rows;
};
