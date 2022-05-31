const fs = require("fs");

class InventorysArchive { 
  constructor(path) {
      this.path = `databases/${path}`;
  }

  async read() {
    const data = await fs.promises.readFile(this.path, "utf8");
    return JSON.parse(data);
  }

  async save(data) {
  let inventory = await this.getAll();
  if (inventory.some(o => o.id == data.id)) return
  inventory.push(data);
  try{
    await fs.promises.writeFile(this.path, JSON.stringify(inventory, null, 2));
  } catch (error) {
    throw new Error(error.message);
  }
  return data;
  }


  async getAll() { 
    let inventory = await this.read();
    return [...inventory];
  }

  async getById(id) {
    let inventory = await this.read();
    return inventory.find((product) => product.id == id);
  }

  async deleteAll() {
    return await fs.promises.writeFile(this.path, "[]");
  }

  async deleteById(id) {
     let inventory = await this.read();
    const filtrado = inventory.filter((product) => product.id !== id);
    await fs.promises.writeFile(rute, JSON.stringify(filtrado));
  }
};




module.exports = { InventorysArchive };