const fs = require("fs");
const Products = require("./Products.js");
/*const idRandom = () => {
  return `${Date.now()}`;
}*/
 
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
    await this._read() 
    const filtrado = this.inventory.filter((product) => product.id !== id); 
    await fs.promises.writeFile(this.rute, JSON.stringify(filtrado)); 
  }

  
  async save(data) {
    /*const product = new Products(
      data.id,
      data.title,
      data.price,
      data.thumbnail
    );*/
    const product = data;
    //product.id = idRandom;
    this.inventory.push(product);
    //const JSONarchive = JSON.stringify(this.inventory, null, 2);
    //await fs.promises.writeFile(this.rute, JSONarchive);
    return product;
  }

  
  /*
  async save(object) {
    object.id = `${Date.now()}`;
    let objects = await this.getAll();
    if (objects.some(o => o.id == object.id)) return;
    objects.push(object);
    try {
        fs.promises.writeFile(this.path, JSON.stringify(objects, null, 2));
    } catch (error) {
        throw new Error(`Error en guardar objeto de id ${object.id}`);
    }
    return object;

}*/
  
}

module.exports = InventorysArchive;
