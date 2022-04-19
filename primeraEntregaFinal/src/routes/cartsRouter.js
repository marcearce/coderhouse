import express from "express";
import CartsController from "../controllers/cartsController.js";

const router = express.Router();

router.get("/", CartsController.getAllCarts); // get all carts;
router.get("/:id", CartsController.getCart); // get cart by id;
router.post("/", CartsController.createCart); // create cart;
router.post("/:id/products", CartsController.addProductToCart); // add product to cart;
router.get("/:id/products", CartsController.getProductsInCart); // get products in cart;
router.delete("/:id/products/:pid", CartsController.deleteProductFromCart); // delete product from cart;
router.delete("/:id", CartsController.deleteCart); // delete cart;
export default router;
