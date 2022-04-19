import Express from "express";
import fs from "fs";

const app = Express();
const port = 8080;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

let visitas = 0;
let visitasRandom = 0;

app.get("/items", async (req, res) => {
  visitas++;
  let data = await fs.promises.readFile("productos.txt", "utf8");
  let obj = JSON.parse(data);
  let objRes = { items: obj, cantidad: obj.length };
  res.type("application/json");
  res.send(JSON.stringify(objRes));
});

app.get("/item-random/", async (req, res) => {
  visitasRandom++;
  let data = await fs.promises.readFile("productos.txt", "utf8");
  let obj = JSON.parse(data);
  let objRes = { item: obj[Math.floor(Math.random() * obj.length)] };
  res.type("application/json");
  res.send(JSON.stringify(objRes));
});

app.get("/visitas", (req, res) => {
  res.type("application/json");
  res.send(JSON.stringify({ visitas: visitas, visitasRandom: visitasRandom }));
});
