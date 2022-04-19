import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import __dirname from "./utils.js";
import ProductsRouter from "./routes/productsRouter.js";
import CartsRouter from "./routes/cartsRouter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
//admin middleware
//para ser admin usar en headers  admin = true
app.use("/api/productos", (req, res, next) => {
  if (req.method === "GET") return next();
  if (req.headers.admin === "true") return next();
  return res.status(401).send({ message: "You are not authorized" });
});

/**
 * api productos
 */
app.use("/api/products", ProductsRouter);
app.use("/api/carts", CartsRouter);
