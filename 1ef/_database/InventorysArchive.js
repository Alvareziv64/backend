const fs = require("fs");
const Products = require("./Products.js");

class InventorysArchive {
  constructor(rute) {
    this.rute = rute;
    this.inventory = [];
  }

  async _read() {
    const data = await fs.promises.readFile(this.rute, "utf8");
    this.inventory = JSON.parse(data);
    return this.inventory;
  }

  async save(data) {
    const product = new Products(
      data.id,
      data.title,
      data.price,
      data.thumbnail
    );
    this.inventory.push(product);
    const JSONarchive = JSON.stringify(this.inventory, null, 2);
    await fs.promises.writeFile(this.rute, JSONarchive);
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
    this.inventory = this.inventory.filter((product) => product.id != id);
    await this.save(id);
}

}

module.exports = InventorysArchive;
