import fs from "fs";

class Archivos {
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
    console.log(id);
    const archivo = await fs.promises.readFile(
      this.ruta + nombreArchivo,
      "utf-8"
    );
    const productos = JSON.parse(archivo);
    const product = productos.find((producto) => producto.id == id);
    if (!product) return false;
    return product;
  }

  async getProductCart(nombreArchivo, ids) {
    try {
      const archivo = await fs.promises.readFile(
        this.ruta + nombreArchivo,
        "utf-8"
      );

      const productos = JSON.parse(archivo);
      //const product = productos.find((producto) => producto.id == ids);
      const productFound = productos.filter((producto) =>
        ids.includes(producto.id)
      );
      return productFound;
    } catch (error) {
      return false;
    }
  }

  async create(nombreArchivo, producto) {
    const archivo = await fs.promises.readFile(
      this.ruta + nombreArchivo,
      "utf-8"
    );
    const productos = JSON.parse(archivo);
    producto.id = productos.length + 1;
    productos.push(producto);
    await fs.promises.writeFile(
      this.ruta + nombreArchivo,
      JSON.stringify(productos)
    );
    return this.get(nombreArchivo, producto.id);
  }

  async update(nombreArchivo, id, producto) {
    const archivo = await fs.promises.readFile(
      this.ruta + nombreArchivo,
      "utf-8"
    );
    const productos = JSON.parse(archivo);
    const index = productos.findIndex((o) => o.id == id);
    if (index == -1) {
      console.log(
        `Error al actualizar: no se encontró el producto con id ${id}`
      );
      //return [];
    } else {
      productos[index] = producto;
      try {
        await fs.promises.writeFile(
          this.ruta + nombreArchivo,
          JSON.stringify(productos)
        );
        return productos[index];
      } catch (error) {
        console.log(`Error al borrar: ${error}`);
      }
    }
  }

  async delete(nombreArchivo, id) {
    try {
      const archivo = await fs.promises.readFile(
        this.ruta + nombreArchivo,
        "utf-8"
      );
      const productos = JSON.parse(archivo);
      const productoIndex = productos.findIndex(
        (producto) => producto.id === id
      );
      productos.splice(productoIndex, 1);
      await fs.promises.writeFile(
        this.ruta + nombreArchivo,
        JSON.stringify(productos)
      );
      return productos;
    } catch (error) {
      console.log(`Error al borrar: ${error}`);
      return false;
    }
  }

  async deleteAll(nombreArchivo) {
    await fs.promises.writeFile(this.ruta + nombreArchivo, "[]");
  }

  async updateStock(nombreArchivo, id, cantidad) {
    const archivo = await fs.promises.readFile(
      this.ruta + nombreArchivo,
      "utf-8"
    );
    const productos = JSON.parse(archivo);
    const index = productos.findIndex((o) => o.id == id);
    if (index == -1) {
      console.log(
        `Error al actualizar: no se encontró el producto con id ${id}`
      );
      //return [];
    } else {
      productos[index].stock = productos[index].stock - cantidad;
      try {
        await fs.promises.writeFile(
          this.ruta + nombreArchivo,
          JSON.stringify(productos)
        );
        return productos[index];
      } catch (error) {
        console.log(`Error al borrar: ${error}`);
      }
    }
  }
}

export default new Archivos();
