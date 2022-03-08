//import http from "http";
const http = require("http");

function* randomNumber(min, max) {
  while (true) {
    yield Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

const server = http.createServer((peticion, respuesta) => {
  let obj = {
    id: randomNumber(1, 10).next().value,
    title: "Curso de NodeJS " + randomNumber(1, 10).next().value,
    price: randomNumber(0.0, 999.99).next().value.toFixed(2),
    thumbnail: "Foto " + randomNumber(1, 10).next().value,
  };
  respuesta.end(JSON.stringify(obj));
});
server.listen(8080, () => {
  console.log("Listening on port 8080");
});
