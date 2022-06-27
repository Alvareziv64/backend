import admin from "firebase-admin";
import config from "../config.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase.serviceAccount),
});

const db = admin.firestore();
const randomId = Date.now();
const cartCreate = [];

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
      const docs = await this.coleccion.where("id", "==", Number(id)).get();
      return docs.docs.map((d) => d.data());
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async setById(id, data) {
    try {
      const docs = await this.coleccion.where("id", "==", Number(id)).get();
      const doc = docs.docs[0];
      await doc.ref.update(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteById(id) {
    try {
      const docs = await this.coleccion.where("id", "==", Number(id)).get();
      const doc = docs.docs[0];
      await doc.ref.delete();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /*
  async deleteAll() {
    try {
      const docs = await this.listarAll();
      const ids = docs.map((d) => d.id);
      const promesas = ids.map((id) => this.borrar(id));
      await Promise.all(promesas);
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }*/

  // Cart Logic --------------------------------------------------------------

  async createCart() {
    try {
      const cart = {
        id: randomId,
        items: [],
      };
      await this.save(cart);
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async postProductsInCart(cartId, reqBody) {
    try {
      const docs = await this.coleccion.where("id", "==", Number(cartId)).get();
      const doc = docs.docs[0];
      await doc.ref.update({
        items: [...doc.data().items, reqBody],
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductsInCart(id) {
    try {
      const docs = await this.coleccion.where("id", "==", Number(id)).get();
      const doc = docs.docs[0];
      return doc.data().items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async putProductsInCart(cartId, reqBody) {
    try {
      const docs = await this.coleccion.where("id", "==", Number(cartId)).get();
      const doc = docs.docs[0];
      await doc.ref.update({
        items: reqBody,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProductInCart(cartId, productId) {
    try {
      const docs = await this.coleccion.where("id", "==", Number(cartId)).get(); 
      const doc = docs.docs[0];
      const items = doc.data().items;
      const newItems = items.filter((item) => item.id !== productId);
      await doc.ref.update({
        items: newItems,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProductsInCart(cartId) {
    try {
      const docs = await this.coleccion.where("id", "==", Number(cartId)).get();
      const doc = docs.docs[0];
      await doc.ref.update({
        items: [],
      });
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
