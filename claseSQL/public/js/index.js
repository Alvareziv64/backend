const socket = io();

//MENSAJES-------------------------------------------------------------------

const mostrarMensajes = (mensajes) => {
  const mensajesParaMostrar = mensajes.map(({ fecha, autor, texto }) => {
    return `<div class="alert alert-primary"> <b>${autor}:</b> ${texto} - (${fecha})</div>`;
  });

  const mensajesHtml = `
<ul>
${mensajesParaMostrar.join("\n")}
</ul>`;

  const listaMensajes = document.getElementById("listaMensajes");
  listaMensajes.innerHTML = mensajesHtml;
}

socket.on("mensajesActualizados", (mensajes) => {
  mostrarMensajes(mensajes);
});


const botonEnviarChat = document.getElementById("botonEnviarChat");
botonEnviarChat.addEventListener("click", () => {
  const inputAutor = document.getElementById("inputAutor");
  const inputMensaje = document.getElementById("inputMensaje");
  const inputFecha = new Date().toLocaleString();
  if (inputAutor.value && inputMensaje.value) {
    const mensaje = {
      autor: inputAutor.value,
      texto: inputMensaje.value,
      fecha: inputFecha
    };
    socket.emit("nuevoMensaje", mensaje);
  } else {
    alert("insert a message");
  }
});


//PRODUCTOS--------------------------------------------------------------------


const mostrarProductos = (productos) => {
  const productosParaMostrar = productos.map(({ title, price, thumbnail }) => {
      return `<div class="alert alert-primary">Title: <b>${title}</b>, Price: <b>$${price}</b>, Thumbnail: <b>${thumbnail}</b></div>`;
  });

  const productosHtml = ` 
  <ul>
  ${productosParaMostrar.join("\n")}
  </ul>`;

  const listaProductos = document.getElementById("listaProductos");
  listaProductos.innerHTML = productosHtml;
}

socket.on("productosActualizados", (productos) => {
  mostrarProductos(productos);
});

const botonEnviarProductos = document.getElementById("botonEnviarProductos");
botonEnviarProductos.addEventListener("click", () => {
    const inputTitle = document.getElementById("inputTitle");
    const inputPrice = document.getElementById("inputPrice");
    const inputThumbnail = document.getElementById("inputThumbnail");
    if ( inputTitle.value && inputPrice.value && inputThumbnail.value ) {
        const producto = {
            title: inputTitle.value,
            price: inputPrice.value,
            thumbnail: inputThumbnail.value,
        };
        socket.emit("nuevoProducto", producto);
    } else {
        alert("complete all fields");
    }
});

