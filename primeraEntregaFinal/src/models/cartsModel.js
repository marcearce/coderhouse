import driverFiles from "../db/driverFiles.js";
import cartsDriver from "../db/cartsDriver.js";
import crypto from "crypto";

class CartsModel {
  constructor() {
    this.filename = "carts.json";
    this.id = 0;
  }

  getAllCarts = () => {
    return cartsDriver.getAll(this.filename);
  };

  getProductCart = (id, product) => {
    return cartsDriver.getProductCart(this.filename, id, product);
  };

  getCart = (id) => {
    return cartsDriver.get(this.filename, id);
  };

  createCart = (cart) => {
    cart.id = this.idCartGenerate();
    cart.timestamp = new Date().toISOString();
    cart.products = [];
    return cartsDriver.create(this.filename, cart);
  };

  idCartGenerate() {
    return crypto.randomBytes(16).toString("hex");
  }

  addProductToCart = (id, product) => {
    product.quantity = 1;
    return cartsDriver.addProductToCart(this.filename, id, product);
  };

  updateQuantity = (id, product) => {
    return cartsDriver.updateQuantity(this.filename, id, product);
  };

  getProductsInCart = (id) => {
    return cartsDriver.getProductsInCart(this.filename, id);
  };

  deleteProductFromCart = (id, product) => {
    return cartsDriver.deleteProductFromCart(this.filename, id, product);
  };

  deleteCart = (id) => {
    return cartsDriver.deleteCart(this.filename, id);
  };
}

export default new CartsModel();
