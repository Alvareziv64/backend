const express = require("express");
const app = express();
const { webController } = require("./controllers/webController");
const { apiController } = require("./controllers/apiController");

//webController
app.get("/", webController.root);
app.get("/home", webController.home);
app.get("/about", webController.about);

//apiController
app.get("/products", apiController.products);
app.get("/random", apiController.random);

const port = 8080;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
server.on("error", (error) => {
  console.log(error.message);
});
