import ProductsModel from "../models/productsModel.js";

/**
 * get all products from the model
 * @param {*} req
 * @param {*} res
 */
const getAllProducts = async (req, res) => {
  const products = await ProductsModel.getAllProducts();
  res.status(200).send(products);
};

const getProduct = async (req, res) => {
  const product = await ProductsModel.getProduct(req.params.id);
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
};

const createProduct = async (req, res) => {
  const product = req.body;
  if (
    !product.nombre ||
    !product.descripcion ||
    !product.foto ||
    !product.precio ||
    !product.stock ||
    !product.codigo
  ) {
    return res.status(400).send({ message: "Missing parameters" });
  } else {
    const newProduct = await ProductsModel.createProduct(product);
    return res.status(201).send(newProduct);
  }
};

/**
 * update a product
 * @author: marcearce
 * @param {*} req
 * @param {*} res
 * @returns producto actualizado
 */
const updateProduct = async (req, res) => {
  const product = req.body;
  if (
    !product.nombre ||
    !product.descripcion ||
    !product.foto ||
    !product.precio ||
    !product.stock ||
    !product.codigo
  ) {
    return res.status(400).send({ message: "Missing parameters" });
  }
  const updatedProduct = await ProductsModel.updateProduct(
    req.params.id,
    product
  );
  if (updatedProduct) return res.status(200).send(updatedProduct);
  return res.status(404).send({ message: "Product not found" });
};

const deleteProduct = async (req, res) => {
  const product = await ProductsModel.deleteProduct(req.params.id);
  if (product) {
    return res.status(200).send("Product deleted");
  } else {
    return res.status(404).send({ message: "Product not found" });
  }
};

const populateProducts = async (ids) => {
  const products = await ProductsModel.getAllProducts();
  const productsIds = products.map((product) => product.id);
  const productsToShow = ids.filter((id) => productsIds.includes(id));
  return productsToShow;
};

const updateStock = async (req, res) => {
  const product = req.body;
  if (!product.id || !product.stock) {
    return res.status(400).send({ message: "Missing parameters" });
  }
  const updatedProduct = await ProductsModel.updateStock(product);
  if (updatedProduct) return res.status(200).send(updatedProduct);
  return res.status(404).send({ message: "Product not found" });
};

export default {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  populateProducts,
};
