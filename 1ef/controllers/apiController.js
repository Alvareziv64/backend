const InventorysArchive = require("../_database/InventorysArchive");
const { main } = require("../_database/main");
const inventory = new InventorysArchive("../clase5y6/_database/inventory.txt");

const apiController = {
  getProducts: (req, res) => {
    inventory.getAll().then((products) => {
      res.json(products);
    });
  },

  deleteById: async (req, res) => {
    const id = req.params.id;
    try {
      await inventory.deleteById(Number(id));
      res.json({ message: "Product deleted" });
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  },

  postProducts: async (req, res) => {
    try{
      const newProduct = await inventory.save(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

   /* inventory.save(req.body);
    res.json(inventory);*/

  getById: (req, res) => {
    inventory.getById(req.params.id).then((product) => {
      res.json(product);
    });
  },

  putById: (req, res) => {
    inventory.save(req.body).then(() => {
      res.json({ message: "Product updated" });
    });
  },
};

module.exports = { apiController };
