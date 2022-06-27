import { MongoClient, ServerApiVersion } from 'mongodb';
import config from '../config.js';

const uri = config.mongodb.cnxStr;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    if (err) {
        console.log(err);
    };
});


const db = client.db(config.mongodb.dbName);

class mongoContainer {
    constructor (nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    async save(data) {
        try {
            await this.coleccion.insertOne(data)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getAll() {
        try {
            const docs = await this.coleccion.find().toArray()
            return docs
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getById(id) {
        try {
            const doc = this.coleccion.findOne({id:Number(id)})
            return doc
        } catch (error) {
            throw new Error(error.message)
        }
    }


    async setById(id, data) {
        try {
            await this.coleccion.updateOne({id:Number(id)}, {$set: (data)})
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteById(id) {
        try {
            await this.coleccion.deleteOne({id : Number(id)})
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deletAll() {
        try {
            await this.coleccion.deleteMany({})
        } catch (error) {
            throw new Error(error.message)
        }
    }

    //CART LOGIC

    async createCart() {
        try {
            await this.coleccion.insertOne({
                id: `${Date.now()}`,
                items: []
            })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async postProductsInCart(cartId, reqBody) {
        try {
            await this.coleccion.updateOne({id:(cartId)}, {$push: {items: (reqBody)}})
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getProductsInCart(cartId) {
        try {
            const cart = await this.coleccion.findOne({id:(cartId)})
            return cart.items
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async putProductsInCart(cartId, reqBody) {
        try {
            await this.coleccion.updateOne({id:(cartId)}, {$set: {items: [(reqBody)]}})
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteProductInCart(cartId, productId) {
        try {
            await this.coleccion.updateOne({id:(cartId)}, {$pull: {items: {id: productId}}})
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteProductsInCart(cartId) {
        try {
            await this.coleccion.updateOne({id:(cartId)}, {$set: {items: []}})
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteCart(cartId) {
        try {
            await this.coleccion.deleteOne({id:(cartId)})
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async disconnect() {
        await db.close()
    }

}

export default mongoContainer
