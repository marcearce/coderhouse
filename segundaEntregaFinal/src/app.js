const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

// const utils = require("./utils.js");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

//detectar errores no deseados (como si desearamos algunos jajajaj)
app.use((err, req, res, next) => {
  console.error(err.message);
  return res.status(500).send("error!");
});

app.on("error", (error) => {
  console.error("error en servidor:", error);
});

// Middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
