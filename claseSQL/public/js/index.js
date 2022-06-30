const socket = io();

//MENSAJES-------------------------------------------------------------------

const botonEnviarChat = document.getElementById("botonEnviarChat");
botonEnviarChat.addEventListener("click", () => {
  const inputEmail = document.getElementById("inputEmail");
  const inputNombre = document.getElementById("inputNombre");
  const inputApellido = document.getElementById("inputApellido");
  const inputEdad = document.getElementById("inputEdad");
  const inputAlias = document.getElementById("inputAlias");
  const inputAvatar = document.getElementById("inputAvatar");
  const inputMensaje = document.getElementById("inputMensaje");
  if (inputEmail.value && inputMensaje.value) {
    const mensaje = {
      author: {
        email: inputEmail.value,
        nombre: inputNombre.value,
        apellido: inputApellido.value,
        edad: inputEdad.value,
        alias: inputAlias.value,
        avatar: inputAvatar.value
      },
      comments: inputMensaje.value,
      }
    socket.emit("nuevoMensaje", mensaje);
  } else {
    alert("insert a message");
  }
});

const mostrarMensajes = (mensajes) => {
  const mensajesParaMostrar = mensajes.map(({ author, comments }) => {
    return `<div class="alert alert-primary"> <b>Author: ${author.email}</b>: ${comments}</div>`;
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

