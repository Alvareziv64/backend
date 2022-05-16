const socket = io();

//------------------------------------------------------------------------------

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

const mostrarProductos = (productos) => {
    const productosParaMostrar = productos.map(({ id, title, price, thumbnail }) => {
        return `<div class="alert alert-primary">Id: <b>${id}</b>, Title: <b>${title}</b>, Price: <b>$${price}</b>, Thumbnail: <b>${thumbnail}</b></div>`;
    });

    const productosHtml = ` 
    <ul>
    ${productosParaMostrar.join("\n")}
    </ul>`;

    const listaProductos = document.getElementById("listaProductos");
    listaProductos.innerHTML = productosHtml;
}


//------------------------------------------------------------------------------

socket.on("mensajesActualizados", (mensajes) => {
  mostrarMensajes(mensajes);
});

socket.on("productosActualizados", (productos) => {
    mostrarProductos(productos);
});

//------------------------------------------------------------------------------

const botonEnviarChat = document.getElementById("botonEnviarChat");
botonEnviarChat.addEventListener("click", () => {
  const inputAutor = document.getElementById("inputAutor");
  const inputMensaje = document.getElementById("inputMensaje");
  if (inputAutor.value && inputMensaje.value) {
    const mensaje = {
      autor: inputAutor.value,
      texto: inputMensaje.value,
    };
    socket.emit("nuevoMensaje", mensaje);
  } else {
    alert("insert a message");
  }
});


const botonEnviarProductos = document.getElementById("botonEnviarProductos");
botonEnviarProductos.addEventListener("click", () => {
    const inputId = document.getElementById("inputId");
    const inputTitle = document.getElementById("inputTitle");
    const inputPrice = document.getElementById("inputPrice");
    const inputThumbnail = document.getElementById("inputThumbnail");
    if (inputId.value && inputTitle.value && inputPrice.value && inputThumbnail.value) {
        const producto = {
            id: inputId.value,
            title: inputTitle.value,
            price: inputPrice.value,
            thumbnail: inputThumbnail.value,
        };
        socket.emit("nuevoProducto", producto);
    } else {
        alert("add a new product");
    }
});
