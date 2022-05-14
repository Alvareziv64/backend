
const express = require('express')

const productos = [
    {
      "id": 1,
      "title": "Laptop",
      "price": 500,
      "thumbnail": "img/laptop.jpg"
    },
    {
      "id": 2,
      "title": "Mouse",
      "price": 50,
      "thumbnail": "img/mouse.jpg"
    },
    {
      "id": 3,
      "title": "Monitor",
      "price": 200,
      "thumbnail": "img/monitor.jpg"
    }
  ]

const app = express()

app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('inicio', { productos });
});

app.get('/products', (req, res) => {
    res.render('products', { productos });
});

app.post('/productos', (req, res) => {
    productos.push(req.body)
    console.log(productos)
    res.redirect('/')
});

const port = 8080;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
server.on("error", (error) => {
  console.log(error.message);
});