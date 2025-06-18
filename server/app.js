const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT;

app.use(
  session({
    secret: "my-secret-key", // 꼭 환경변수로 관리하세요
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1시간 유지
    },
  })
);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5000",
      "http://good-ping.kro.kr",
    ],
    credentials: true,
  })
);

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const login = require("./routes/user");
const reserv = require("./routes/reserv");
const solapi = require("./routes/solapi");

app.use("/user", login);
app.use("/reserv", reserv);
app.use("/sms", solapi);

app.listen(PORT, function () {
  console.log(`Sever Open: http://localhost:${PORT}`);
});
