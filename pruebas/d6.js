let fs = require("fs");
// class Archivo {
//   constructor(nombre) {
//     this.nombre = nombre;
//   }
// }

// let archivo = new Archivo("productos.txt");

let producto = {
  title: "guantes",
  price: 100.0,
  tumbnail: "alsjdhlakdjla",
};
//crear archivo con contenido.
fs.writeFileSync("productos.txt", JSON.stringify(producto), "utf8");
//leer archivo
//let product = fs.readFileSync("productos.txt", "utf8");

console.log(producto);

if (fs.existsSync("productos.txt")) {
  console.log("existe");
} else {
  console.log("no existe");
}
