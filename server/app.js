const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5000",
      "http://good-ping.kro.kr",
      "http://localhost:5174",
      "http://192.168.0.63",
    ],
    credentials: true,
  })
);

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret:
      "bbc35008d4f950cfe234d12c7ebedfc7f40f434da2846ecd7db06292756dc1f5f851395a6474158d6bcec600365f931ce70eddd1ec904666ed62e5e075d1a2e3", // 꼭 환경변수로 관리하세요
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
  })
);

const login = require("./routes/user");
const reserv = require("./routes/reserv");
const solapi = require("./routes/solapi");

app.use("/user", login);
app.use("/reserv", reserv);
app.use("/sms", solapi);

app.listen(PORT, function () {
  console.log(`Sever Open: http://localhost:${PORT}`);
});
