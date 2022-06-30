import fs from 'fs';
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
    if (inventory.some((o) => o.id == data.id)) return;
    inventory.push(data);
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(inventory, null, 2)
      );
    } catch (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async getAll() {
    let inventory = await this.read();
    try {
      return [...inventory];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getById(id) {
    let inventory = await this.read();
    try {
      return inventory.find((o) => o.id == id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteAll() {
    try {
      return await fs.promises.writeFile(this.path, "[]");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteById(id) {
    let inventory = await this.read();
    try {
      const filtrado = inventory.filter((o) => o.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(filtrado));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // cart logic

  async createCart() {
    let inventory = await this.read();
    let cart = {
      id: `${Date.now()}`,
      products: [], 
    };
    try {
      inventory.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(inventory));
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async postProductsInCart(id, productId) {
    let inventory = await this.read();
    try {
      let cart = inventory.find((o) => o.id == id); 
      let article = inventory.find((o) => o.id == productId)
      cart.products.push(article);
      await fs.promises.writeFile(this.path, JSON.stringify(inventory));
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getProductsInCart(id) {
    let inventory = await this.read();
    try {
      let cart = inventory.find((o) => o.id == id);
      return cart.products;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProductInCart(id, productId) {
    let inventory = await this.read();
    try {
      let cart = inventory.find((o) => o.id == id);
      cart.products = cart.products.filter((o) => o.id !== productId);
      await fs.promises.writeFile(this.path, JSON.stringify(inventory));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteCart(id) {
    let inventory = await this.read();
    try {
      inventory = inventory.filter((o) => o.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(inventory));
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default InventorysArchive;
