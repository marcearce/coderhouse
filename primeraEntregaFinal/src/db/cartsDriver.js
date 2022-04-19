import fs from "fs";
class Carrito {
  constructor() {
    this.ruta = "./src/db/";
  }

  async getAll(nombreArchivo) {
    try {
      const archivo = await fs.promises.readFile(
        this.ruta + nombreArchivo,
        "utf-8"
      );
      return archivo;
    } catch (error) {
      return false;
    }
  }

  async get(nombreArchivo, id) {
    try {
      const archivo = await fs.promises.readFile(
        this.ruta + nombreArchivo,
        "utf-8"
      );
      const carritos = JSON.parse(archivo);
      const carrito = carritos.find((carrito) => carrito.id == id);
      return carrito;
    } catch (error) {
      return false;
    }
  }

  async getProductCart(nombreArchivo, id, producto) {
    try {
      const archivo = await fs.promises.readFile(
        this.ruta + nombreArchivo,
        "utf-8"
      );
      const carritos = JSON.parse(archivo);
      const carrito = carritos.find((carrito) => carrito.id == id);
      if (!carrito) return false;
      const productoCarrito = carrito.products.find(
        (product) => product.id == producto.id
      );
      return productoCarrito;
    } catch (error) {
      return false;
    }
  }

  /**
   * actualizo la cantidad de productos en el carrito cuando el id existe en el carrito
   * @param {string} nombreArchivo
   * @param {int} id
   * @param {object} producto
   * @returns
   */
  async updateQuantity(nombreArchivo, id, producto) {
    try {
      const archivo = await fs.promises.readFile(
        this.ruta + nombreArchivo,
        "utf-8"
      );
      const carritos = JSON.parse(archivo);
      const carrito = carritos.find((carrito) => carrito.id == id);
      const productoCarrito = carrito.products.find(
        (product) => product.id == producto.id
      );

      productoCarrito.quantity += 1;
      await fs.promises.writeFile(
        this.ruta + nombreArchivo,
        JSON.stringify(carritos)
      );
      return true;
    } catch (error) {
      console.log(`Error al actualizar la cantidad del producto: ${error}`);
      return false;
    }
  }

  /**
   * creo un nuevo carrito
   * @param {string} nombreArchivo
   * @param {object} carrito
   * @returns
   */
  async create(nombreArchivo, carrito) {
    try {
      const archivo = await fs.promises.readFile(
        this.ruta + nombreArchivo,
        "utf-8"
      );
      const carritos = JSON.parse(archivo);
      //carrito.id = carritos.length + 1;
      carritos.push(carrito);
      await fs.promises.writeFile(
        this.ruta + nombreArchivo,
        JSON.stringify(carritos)
      );
      return this.get(nombreArchivo, carrito.id);
    } catch (error) {
      return false;
    }
  }

  /**
   * actualizo el carrito
   * @param {string} nombreArchivo
   * @param {int} id
   * @param {object } producto
   * @returns
   */
  async addProductToCart(nombreArchivo, id, producto) {
    try {
      console.log(producto);
      const archivo = await fs.promises.readFile(
        this.ruta + nombreArchivo,
        "utf-8"
      );
      const carritos = JSON.parse(archivo);
      const index = carritos.findIndex((carrito) => carrito.id == id);
      if (index == -1) {
        console.log(
          "El carrito no existe, no se puede agregar el producto al carrito"
        );
        return false;
      }
      carritos[index].products.push(producto);
      await fs.promises.writeFile(
        this.ruta + nombreArchivo,
        JSON.stringify(carritos)
      );
      return this.get(nombreArchivo, id);
    } catch (error) {
      return false;
    }
  }

  async getProductsInCart(nombreArchivo, id) {
    try {
      const archivo = await fs.promises.readFile(
        this.ruta + nombreArchivo,
        "utf-8"
      );
      const carritos = JSON.parse(archivo);
      const carrito = carritos.find((carrito) => carrito.id == id);
      return carrito.products;
    } catch (error) {
      return false;
    }
  }

  async deleteProductFromCart(nombreArchivo, id, producto) {
    try {
      const archivo = await fs.promises.readFile(
        this.ruta + nombreArchivo,
        "utf-8"
      );
      const carritos = JSON.parse(archivo);
      const carrito = carritos.find((carrito) => carrito.id == id);
      if (!carrito) return false;
      const index = carrito.products.findIndex(
        (product) => product.id == producto.id
      );
      if (index == -1) {
        console.log("El producto no existe en el carrito");
        return false;
      }
      carrito.products.splice(index, 1);
      await fs.promises.writeFile(
        this.ruta + nombreArchivo,
        JSON.stringify(carritos)
      );
      return this.get(nombreArchivo, id);
    } catch (error) {
      return false;
    }
  }

  async deleteCart(nombreArchivo, id) {
    try {
      const archivo = await fs.promises.readFile(
        this.ruta + nombreArchivo,
        "utf-8"
      );
      const carritos = JSON.parse(archivo);
      const index = carritos.findIndex((carrito) => carrito.id == id);
      if (index == -1) {
        console.log("El carrito no existe");
        return false;
      }
      carritos.splice(index, 1);
      await fs.promises.writeFile(
        this.ruta + nombreArchivo,
        JSON.stringify(carritos)
      );
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new Carrito();
