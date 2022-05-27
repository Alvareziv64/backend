const InventorysArchive = require("../_database/InventorysArchive");
const { main } = require("../_database/main");

const apiController = {

  getProducts: (req, res) => {
    const inventory = new InventorysArchive("../clase5y6/_database/inventory.txt");
    inventory.getAll().then((products) => {
      res.json(products);
    });
  },

  getById: (req, res) => {
    const inventory = new InventorysArchive("../clase5y6/_database/inventory.txt");
    inventory.getById(req.params.id).then((product) => {
      res.json(product);
    }); 
  },

  postProducts: (req, res) => {
    const inventory = new InventorysArchive("../clase5y6/_database/inventory.txt");
    inventory.save(req.body).then((products) => {
      res.json(products);
    });
  },

  deleteById: (req, res) => {
    const inventory = new InventorysArchive("../clase5y6/_database/inventory.txt");
    inventory.deleteById(req.params.id).then(() => {
      res.json({ message: "Product deleted" });
    });
  },

  putById: (req, res) => {
    const inventory = new InventorysArchive("../clase5y6/_database/inventory.txt");
    inventory.save(req.body).then(() => {
      res.json({ message: "Product updated" });
    });
  }


}

module.exports = { apiController };
