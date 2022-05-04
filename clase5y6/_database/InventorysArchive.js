const fs = require("fs");
const Products = require("./Products.js");

class InventorysArchive {
  constructor(rute) {
    this.rute = rute;
    this.inventory = [];
  }

  _save() {
    const jsonProducts = JSON.stringify(this.inventory, null, 2);
    return fs.promises.writeFile(this.rute, jsonProducts);
  }

  _read() {
    return fs.promises.readFile(this.rute, "utf-8").then((data) => {
      const arrayProducts = JSON.parse(data);
      this.inventory = arrayProducts;
    });
  }

  async save(data) {
    const product = new Products(
      data.id,
      data.title,
      data.price,
      data.thumbnail
    );
    await this._read();
    this.inventory.push(product);
    await this._save();
  }

  async getAll() {
    await this._read();
    return [...this.inventory];
  }

  async getById(id) {
    await this._read();
    return this.inventory.find((product) => product.id == id);
  }

  async deleteAll() {
    await this._read();
    this.inventory = [];
  }

  async deleteById(id) {
    await this._read();
    const indice = this.inventory.findIndex((product) => product.id === id);
    if (indice !== -1) {
      this.inventory.splice(indice, 1);
      await this._save();
    }
  }
}

module.exports = InventorysArchive;
