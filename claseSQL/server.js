import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { normalize, denormalize, schema } from "normalizr";
import util from 'util';

function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true))
}

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


app.use(express.json());
app.use(express.static("public"));


//mock products
import ApiProductsMock from "./api/products.js";
const apiProducts = new ApiProductsMock();

app.get("/api/products-test", async (req, res) => {
  try {
    res.json(await apiProducts.create());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//vista inicio
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "views" });
  }); 

//Productos
const productos = [];
//Chat


const mensajes = [];

print(mensajes)
console.log(JSON.stringify(mensajes).length)

//NORMALIZR

// author schema where we use email as id
const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' });

// Definimos un esquema de comentarios
const commentSchema = new schema.Entity('comments')

// Definimos un esquema de artículos


const postSchema = new schema.Entity('mensajes', {
  author: authorSchema,
  comments: commentSchema
});

const normalized = normalize(mensajes, postSchema); // Normalizamos los datos

print(normalized)
console.log(JSON.stringify(normalized).length)

//const denormalized = denormalize(normalized.result, postSchema, normalized.entities);

//print(denormalized)
//console.log(JSON.stringify(denormalized).length)


//socket.io
io.on("connection", (socket) => {
 
  socket.on("nuevoMensaje", (mensaje) => {
    mensajes.push(mensaje); 
    io.sockets.emit("mensajesActualizados", mensajes);
  });  
  socket.emit("mensajesActualizados", mensajes);


  socket.on("nuevoProducto", (producto) => {
    productos.push(producto);
    io.emit("productosActualizados", productos);
  });


});  


//knex chat
app.get("/api/chat", async (req, res) => {
  try {
    const chat = await clienteSqlite.select("*").from("chat");
    res.json(chat);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const newChat = mensajes;
    const result = await clienteSqlite.insert(newChat).into("chat");
    res.json(result); 
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});




//knex productoss

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