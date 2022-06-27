import { Router } from 'express';
import { cartDao } from '../daos/cart/index.js'

const cartRouter = Router()

const cartControllerGet = async (req, res) => {
    const cart = await cartDao.getAll();
    res.json(cart);
};

const cartControllerCreateCart = async (req, res) => {
    const prodAgregado = await cartDao.createCart();
    res.json(prodAgregado)
};

const cartControllerGetById = async (req, res) => {
    const product = await cartDao.getProductsInCart(req.params.id);
    res.json(product);
};




const cartControllerPostProductsInCart = async (req, res) => {
    const prodAgregado = await cartDao.postProductsInCart(req.params.id, req.body);
    res.json(prodAgregado)
    }

const cartControllerPutProductsInCart = async (req, res) => {
    const prodActualizado = await cartDao.putProductsInCart(req.params.id, req.body);
    res.json(prodActualizado)
}

//borrar todos los productos del carrito

const cartControllerDeleteProductsInCart = async (req, res) => {
    const prodEliminados = await cartDao.deleteProductsInCart(req.params.id);
    res.json(prodEliminados)
}


cartRouter.get('/', cartControllerGet) //obtener todos los carritos
cartRouter.get('/:id', cartControllerGetById) //obtener un carrito por id
cartRouter.post('/', cartControllerCreateCart) //crear un carrito
cartRouter.post('/:id', cartControllerPostProductsInCart) //agregar un producto al carrito
cartRouter.put('/:id', cartControllerPutProductsInCart) //actualizar un producto del carrito
cartRouter.delete('/:id', cartControllerDeleteProductsInCart) //borrar todos los productos del carrito


export { cartRouter }