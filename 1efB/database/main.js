const fs = require("fs");

const inventory = new InventorysArchive("../clase5y6/database/inventory.txt");

const Main = {
  async read(rute) {
    const data = await fs.promises.readFile(rute, "utf8");
    return JSON.parse(data);
  },

  async getAll() {
    await _read();
    return [...inventory];
  },

  async getById(id) {
    await _read();
    return inventory.find((product) => product.id == id);
  },

  async deleteAll() {
    await _read();
    inventory = [];
  },

  async deleteById(id) {
    await _read();
    const filtrado = inventory.filter((product) => product.id !== id);
    await fs.promises.writeFile(rute, JSON.stringify(filtrado));
  },
};
