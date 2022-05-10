const InventorysArchive = require("../_database/InventorysArchive");
const { main } = require("../_database/main");

const apiController = {

  getProducts: (req, res) => {
    const inventory = new InventorysArchive(".products.txt");
    inventory.getAll().then((products) => {
      res.json(products);
    });
  },

  getById: (req, res) => {
    const inventory = new InventorysArchive(".products.txt");
    inventory.getById(req.params.id).then((product) => {
      res.json(product);
    }); 
  },

  postProducts: (req, res) => {
    const inventory = new InventorysArchive(".products.txt");
    inventory.save(req.body).then((products) => {
      res.json(products);
    });
  },

  deleteById: (req, res) => {
    const inventory = new InventorysArchive(".products.txt");
    inventory.deleteById(req.params.id).then(() => {
      res.json({ message: "Product deleted" });
    });
  },

  putById: (req, res) => {
    const inventory = new InventorysArchive(".products.txt");
    inventory.save(req.body).then(() => {
      res.json({ message: "Product updated" });
    });
  }


}

module.exports = { apiController };
