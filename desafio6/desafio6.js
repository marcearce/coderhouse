let fs = require("fs");
class Archivo {
  constructor(nombre) {
    this.nombre = nombre;
    if (!fs.existsSync(nombre)) {
      this.createFile();
    }
  }

  async createFile() {
    try {
      await fs.promises.writeFile(this.nombre, "[]");
    } catch (error) {
      console.log(error);
    }
  }

  async existFile() {
    try {
      await fs.promises.readFile(this.nombre, "utf8");
    } catch (error) {
      //no existe el archivo
      this.createFile();
    }
  }

  async addProduct(product) {
    try {
      let data = await fs.promises.readFile(this.nombre, "utf8");
      let products = JSON.parse(data);
      product.id = products.length + 1;
      products.push(product);
      await fs.promises.writeFile(this.nombre, JSON.stringify(products));
    } catch (error) {
      console.log(error);
    }
  }

  async readProducts() {
    try {
      let data = await fs.promises.readFile(this.nombre, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  }
}

let archivo = new Archivo("productos.txt");

const addProduct = async () => {
  await archivo.addProduct({
    title: "teclado mecanico",
    price: 100.0,
    tumbnail: "imagen",
  });
  await archivo.addProduct({
    title: "mouse",
    price: 100.0,
    tumbnail: "imagen",
  });
  await archivo.addProduct({
    title: "monitor",
    price: 100.0,
    tumbnail: "imagen",
  });
};
const readProducts = async () => {
  let products = await archivo.readProducts();
  console.log(products);
};

addProduct();

readProducts();
