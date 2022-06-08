const express = require("express");
const { clienteSql } = require("./clienteSql.js") ;
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
app.use(express.json());
app.use(express.static("public"));

//vista inicio
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "views" });
  }); 

//Productos
const productos = [];
//Chat
const mensajes = [];

//socket.io
io.on("connection", (socket) => {
  socket.emit("mensajesActualizados", mensajes);

  socket.on("nuevoProducto", (producto) => {
    productos.push(producto);
    io.emit("productosActualizados", productos);
  });

  socket.on("nuevoMensaje", (mensaje) => {
    mensaje.fecha = new Date().toLocaleString();
    mensajes.push(mensaje);
    io.sockets.emit("mensajesActualizados", mensajes);
  }); 
});  

//knex
app.get("/api/products", async (req, res) => {
  try {
    const allProducts = await clienteSql.select("*").from("products");
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const idProduct = req.params.id;
    const product = await clienteSql
      .select("*")
      .from("products")
      .where({ id: idProduct });
    if (product.length === 0) {
      res.status(404).json({ msg: "not found" });
    } else {
      res.json(product[0]);
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const dataProduct = productos;
    const result = await clienteSql.insert(dataProduct).into("products");
    res.json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


app.put("/api/products/:id", async (req, res) => {
  try {
    const dataProduct = productos;
    const idProduct = productos.id;
    await clienteSql
      .update(dataProduct)
      .from("products")
      .where({ id: idProduct });
    res.json({ msg: "ok" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const idProduct = productos.id;
    await clienteSql.delete().from("products").where({ id: idProduct });
    res.json({ msg: "ok" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


const port = 8080;
const server = httpServer.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
server.on("error", (error) => {
  console.log(error.message);
});