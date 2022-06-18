import admin from "firebase-admin";
import config from "../config.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase.serviceAccount),
});

const db = admin.firestore();

class firebaseContainer {
  constructor(nombreColeccion) {
    this.coleccion = db.collection(nombreColeccion);
  }

  async save(data) {
    try {
      await this.coleccion.add(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAll() {
    try {
      const docs = await this.coleccion.get();
      return docs.docs.map((d) => d.data());
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getById(id) {
    try {
      const doc = await this.coleccion.doc(id).get();
      return doc.data();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async setById(id, data) {
    try {
      await this.coleccion.doc(id).set(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteById(id) {
    try {
      await this.coleccion.doc(id).delete();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteAll() {
    try {
      const docs = await this.listarAll();
      const ids = docs.map((d) => d.id);
      const promesas = ids.map((id) => this.borrar(id));
      await Promise.all(promesas);
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  // Cart Logic

  async createCart() {
    try {
      await this.collection().add({
        items: [],
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async postProductsInCart(cartId, id, title, price, thumbnail) {
    try {
      const cart = await this.getById(cartId);
      cart.items.push({
        id,
        title,
        price,
        thumbnail,
      });
      await this.setById(cartId, cart);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductsInCart(id) {
    try {
      const cart = await this.getById(id);
      return cart.items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async putProductsInCart(cartId, id, title, price, thumbnail) {
    try {
      const cart = await this.getById(cartId);
      const item = cart.items.find((i) => i.id === id);
      item.title = title;
      item.price = price;
      item.thumbnail = thumbnail;
      await this.setById(cartId, cart);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProductInCart(cartId, productId) {
    try {
      const cart = await this.getById(cartId);
      const index = cart.items.findIndex((i) => i.id === productId);
      cart.items.splice(index, 1);
      await this.setById(cartId, cart);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProductsInCart(cartId) {
    try {
      const cart = await this.getById(cartId);
      cart.items = [];
      await this.setById(cartId, cart);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteCart(cartId) {
    try {
      await this.deleteById(cartId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async disconnect() {
    try {
      await db.goOffline();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default firebaseContainer;
