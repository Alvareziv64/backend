const express = require("express");
const webRouter = express.Router();

webRouter.get("/", (req, res) => {
  res.sendFile("index.html", { root: "views" });
});

webRouter.get("/datos", (req, res) => {
  res.render("datos", { nombre: "coder" });
});

module.exports = { webRouter };
