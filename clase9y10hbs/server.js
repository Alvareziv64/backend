const express = require('express');
const {webRouter} = require('./router/webRouter');
const {engine} = require("express-handlebars");

const app = express();

app.use(express.static('public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(webRouter);

webRouter.get('/', (req, res) => {
    res.sendFile("index.html", {root: "views"});
});

app.use(webRouter);

const port = 8080;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
server.on("error", (error) => {
  console.log(error.message);
});