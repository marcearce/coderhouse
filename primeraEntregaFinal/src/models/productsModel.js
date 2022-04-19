import driverFiles from "../db/driverFiles.js";
class ProductsModel {
  constructor() {
    this.filename = "products.json";
    this.id = 0;
  }

  getAllProducts = () => {
    return driverFiles.getAll(this.filename);
  };

  getProduct = (id) => {
    return driverFiles.get(this.filename, id);
  };

  createProduct = (product) => {
    product.timestamp = new Date();
    return driverFiles.create(this.filename, product);
  };

  /**
   * actualiza un producto
   * @param {*} id
   * @param {*} product
   * @returns producto actualizado
   */
  updateProduct = (id, product) => {
    product.id = parseInt(id);
    product.timestamp = new Date();
    return driverFiles.update(this.filename, id, product);
  };

  deleteProduct = (id) => {
    return driverFiles.delete(this.filename, id);
  };

  updateStock = (id, product) => {
    return driverFiles.updateStock(this.filename, id, product);
  };
}
export default new ProductsModel();
