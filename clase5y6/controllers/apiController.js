const InventorysArchive = require("../_database/InventorysArchive");
const { main } = require("../_database/main");

const apiController = {

  products: (req, res) => {
    const inventory = new InventorysArchive(".products.txt");
    inventory.getAll().then((products) => {
      res.json(products);
    });
  },

}

module.exports = { apiController };
