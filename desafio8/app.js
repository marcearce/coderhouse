import Express from "express";
import Products from "./src/controllers/products.js";
const app = Express();
const port = 8080;
const endpoint = "/api/products";

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let products = new Products();

app.get(endpoint, (req, res) => {
  res.type("application/json");
  let allProducts = products.getAllProducts();
  if (!allProducts) res.status(404).send({ error: "No products found" });
  res.status(200).send(allProducts);
});

app.get(`${endpoint}/:id`, (req, res) => {
  console.log(typeof req.params.id);
  res.type("application/json");
  let foundProduct = products.getProduct(parseInt(req.params.id));
  if (!foundProduct)
    res.status(404).send(JSON.stringify({ error: "Product not found" }));
  res.status(200).send(JSON.stringify(foundProduct));
});

app.post(endpoint, (req, res) => {
  res.type("application/json");
  let newProduct = products.addProduct(req.body);
  res.status(200).send(JSON.stringify(newProduct));
  //res.send({ message: "Product added" });
});
