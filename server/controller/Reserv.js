const reservModel = require("../model/Reserv");
const fileController = require("../controller/File");
const axios = require("axios");

exports.postReservAdd = async (req, res) => {
  const { title, price, category } = req.body;
  const create_ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  try {
    const now = new Date();

    const pad = (n, width = 2) => n.toString().padStart(width, "0");

    const formattedDate =
      now.getFullYear().toString() +
      pad(now.getMonth() + 1) +
      pad(now.getDate()) +
      pad(now.getHours()) +
      pad(now.getMinutes()) +
      pad(now.getSeconds()) +
      pad(now.getMilliseconds(), 3);

    await fileController.postFileAdd(req, res, formattedDate);

    await reservModel.insertReserv({
      file_idx: formattedDate,
      title: title,
      price: price,
      category: category,
      create_ip: create_ip,
    });

    res.send({ isSuccess: true, time: formattedDate });
  } catch (error) {
    console.error(error);
    res.status(500).send({ isSuccess: false, msg: "서버 오류" });
  }
};

exports.getReservList = async (req, res) => {
  try {
    let selectList = await reservModel.selectReservList();

    // selectList 안에 있는 각 item의 file_paths를 배열로 변환
    selectList.forEach((item) => {
      item.file_paths = item.file_paths
        ? item.file_paths.split(",").map((s) => s.trim())
        : [];
    });

    res.send({ isSuccess: true, map: selectList });
  } catch (error) {
    console.error(error);
    res.status(500).send({ isSuccess: false, msg: "서버 오류" });
  }
};
