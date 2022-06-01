const express = require("express");
const app = express();
const { webController } = require("./controllers/webController");
const { apiController } = require("./controllers/apiController");

let isAdmin = false;

const onlyAdmins = (req, res, next) => {
    if (isAdmin) {
        next()
    } else {
        res.status(403).send({ error: "Access denied" });
    }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//webController
app.get("/", webController.root);
app.get("/home", webController.home);
app.get("/about", webController.about);

//login
app.get("/login", (req, res) => {
  isAdmin = true;
  res.sendStatus(200);});

app.get("logout", (req, res) => {
  isAdmin = false;
  res.sendStatus(200);});

//apiController
app.get("/api/products", apiController.getProducts,);
app.get("/api/products/:id", apiController.getById);
app.post("/api/products", onlyAdmins, apiController.postProducts);	
app.delete("/api/products/:id", onlyAdmins, apiController.deleteById);
app.put("/api/products/:id", onlyAdmins, apiController.putById);

//apiCartController
app.post("/api/cart", apiController.createCart);
app.post("/api/cart/:id_cart/products", apiController.postProductsInCart);	
app.get("/api/cart/:id_cart/products", apiController.getProductsInCart);
app.delete("/api/cart/:id_cart/products/:id_product", apiController.deleteProductInCart);
app.delete("/api/cart/:id_cart", apiController.deleteCart); 

const port = 8080;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
server.on("error", (error) => {
  console.log(error.message);
}); 
