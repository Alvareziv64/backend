const express = require("express");
const app = express();
const { webController } = require("./controllers/webController");
const { apiController } = require("./controllers/apiController");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//webController
app.get("/", webController.root);
app.get("/home", webController.home);
app.get("/about", webController.about);

//apiController
app.get("/api/products", apiController.getProducts);
app.get("/api/products/:id", apiController.getById);
app.post("/api/products/post", apiController.postProducts);	
app.delete("/api/products/:id", apiController.deleteById);
app.put("/api/products/:id", apiController.putById);

const port = 8080;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
server.on("error", (error) => {
  console.log(error.message);
}); 
