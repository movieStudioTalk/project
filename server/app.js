require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const login = require("./routes/user");

app.use("/user", login);

app.listen(PORT, function () {
  console.log(`Sever Open: http://localhost:${PORT}`);
});
