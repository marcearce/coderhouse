export default class Products {
  // constructor(title, price, thumbnail) {
  //   this.title = title;
  //   this.price = price;
  //   this.thumbnail = thumbnail;
  // }
  constructor() {
    this.products = [];
    this.id = 1;
  }

  getAllProducts() {
    if (this.products.length === 0) return false;
    return this.products;
  }
  getProduct(id) {
    let foundProduct = this.products.find((product) => product.id === id);
    if (!foundProduct) return false;
    return foundProduct;
  }

  addProduct(product) {
    product.id = this.id++;
    this.products.push(product);
    return product;
  }
}
