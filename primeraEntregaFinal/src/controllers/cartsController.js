import CartsModels from "../models/cartsModel.js";
import ProductsModels from "../models/productsModel.js";
import productsController from "./productsController.js";

const getAllCarts = async (req, res) => {
  const carts = await CartsModels.getAllCarts();
  if (!carts) {
    return res.status(404).send({ message: "No hay carritos" });
  }
  return res.status(200).send(carts);
};

const getCart = async (req, res) => {
  const { id } = req.params;
  const cart = await CartsModels.getCart(id);
  if (!cart) {
    return res.status(404).send({ message: "No hay carrito" });
  }
  return res.status(200).send(cart);
};

const createCart = async (req, res) => {
  const cart = req.body;
  // if (!cart.id) {
  //   return res.status(400).send({ message: "Missing parameters" });
  // }
  const newCart = await CartsModels.createCart(cart);
  if (!newCart) {
    return res.status(400).send({ message: "No se pudo crear el carrito" });
  }
  return res.status(201).send(newCart);
};

/**
 * Agregar producto a un carrito
 * @param id req | id del carrito
 * @param product res | producto agregado al carrito
 * @returns
 */
const addProductToCart = async (req, res) => {
  try {
    const id = req.params.id;
    const product = req.body;

    //obtengo el carrito por id
    const cart = await CartsModels.getCart(id);
    if (!cart) {
      return res.status(404).send({ message: "No se encontró el carrito" });
    }

    //busco el producto en el carrito
    const productInCart = await CartsModels.getProductCart(id, product);

    if (productInCart) {
      const updateQuantity = await CartsModels.updateQuantity(id, product);
      if (!updateQuantity) {
        return res
          .status(400)
          .send({ message: "No se pudo actualizar la cantidad" });
      }
      return res.status(200).send({ message: "Producto actualizado" });
    } else {
      //no existe el id de productos en el carrito
      //obtengo el producto por id
      const producto = await ProductsModels.getProduct(product.id);
      if (!producto) {
        return res.status(404).send({ message: "No se encontró el producto" });
      }
      //agrego el producto al carrito
      const newCart = await CartsModels.addProductToCart(id, product);
      if (!newCart) {
        return res
          .status(400)
          .send({ message: "No se pudo agregar el producto" });
      }
      return res.status(201).send({ message: "Producto agregado" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error en el servidor" });
  }
};

const getProductsInCart = async (req, res) => {
  const id = req.params.id;
  const cart = await CartsModels.getCart(id);
  if (!cart) {
    return res.status(404).send({ message: "No se encontró el carrito" });
  }
  const products = await CartsModels.getProductsInCart(id);
  if (!products) {
    return res.status(404).send({ message: "No hay productos en el carrito" });
  }

  const allProducts = JSON.parse(await ProductsModels.getAllProducts());
  console.log(allProducts);
  if (!allProducts) {
    return res.status(404).send({ message: "No hay productos" });
  }
  const productsWithQuantity = products.map((product) => {
    //console.log(product);
    const productWithQuantity = allProducts.find(
      (producto) => producto.id == product.id
    );
    return {
      ...productWithQuantity,
      quantity: product.quantity,
    };
  });
  return res.status(200).send(productsWithQuantity);
};

const deleteProductFromCart = async (req, res) => {
  const id = req.params.id;
  const product = req.params.pid;
  const cart = await CartsModels.getCart(id);
  if (!cart) {
    return res.status(404).send({ message: "No se encontró el carrito" });
  }
  const productInCart = await CartsModels.getProductCart(id, { id: product });
  if (!productInCart) {
    return res.status(404).send({ message: "No se encontró el producto" });
  }
  const deleteProduct = await CartsModels.deleteProductFromCart(id, {
    id: product,
  });
  if (!deleteProduct) {
    return res.status(400).send({ message: "No se pudo eliminar el producto" });
  }
  return res.status(200).send({ message: "Producto eliminado" });
};
const deleteCart = async (req, res) => {
  const id = req.params.id;
  const cart = await CartsModels.getCart(id);
  if (!cart) {
    return res.status(404).send({ message: "No se encontró el carrito" });
  }
  const deleteCart = await CartsModels.deleteCart(id);
  if (!deleteCart) {
    return res.status(400).send({ message: "No se pudo eliminar el carrito" });
  }
  return res.status(200).send({ message: "Carrito eliminado" });
};

export default {
  getAllCarts,
  createCart,
  addProductToCart,
  getCart,
  getProductsInCart,
  deleteProductFromCart,
  deleteCart,
};
