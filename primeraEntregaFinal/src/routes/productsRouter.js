import express from "express";
import ProductsController from "../controllers/productsController.js";

const router = express.Router();

router.get("/", ProductsController.getAllProducts); // get all products;
router.get("/:id", ProductsController.getProduct); // get product by id;
router.post("/", ProductsController.createProduct); // create product;}
router.put("/:id", ProductsController.updateProduct); // update product;
router.delete("/:id", ProductsController.deleteProduct); // delete product;

export default router;
