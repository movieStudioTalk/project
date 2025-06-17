const fileModel = require("../model/file");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const axios = require("axios");

//파일 생성
exports.postFileAdd = async (req, res, formattedDate) => {
  const create_ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  try {
    const fileNames = [];

    for (let i = 0; req.files.length > i; i++) {
      const file = req.files[i];
      // 폴더명 생성 (formattedDate 앞 8자리 → YYYYMMDD)
      const folderName = formattedDate.substring(0, 8);

      const reactProjectPath = path.join(
        __dirname,
        "../../client/public/files",
        folderName
      );

      // 폴더 없으면 생성
      if (!fs.existsSync(reactProjectPath)) {
        fs.mkdirSync(reactProjectPath, { recursive: true });
      }

      // 유니크한 파일명 생성
      const ext = path.extname(file.originalname);
      const randomSuffix = crypto.randomBytes(4).toString("hex");
      const fileName = `${formattedDate}_${randomSuffix}${ext}`;

      //파일생성
      const filePath = path.join(reactProjectPath, fileName);

      fs.writeFileSync(filePath, file.buffer);

      await fileModel.insertFile({
        file_idx: formattedDate,
        file_sub_idx: i,
        file_name: file.originalname,
        file_uniq_name: fileName,
        file_path: `files/${folderName}/${fileName}`,
        mimetype: file.mimetype,
        size: file.size,
        create_ip: create_ip,
      });

      console.log("파일 생성 성공:", filePath);
      fileNames.push(fileName);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ isSuccess: false, msg: "파일 생성 실패" });
  }
};
