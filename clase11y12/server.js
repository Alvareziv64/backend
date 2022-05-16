const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "views" });
}); 

//Productos
const productos = [];
//Chat
const mensajes = [];
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
const port = 8080;
const server = httpServer.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
server.on("error", (error) => {
  console.log(error.message);
});
