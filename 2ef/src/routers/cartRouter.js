import { Router } from 'express';
import { cartDao } from '../daos/cart/index.js'

const cartRouter = Router()

const cartControllerGet = async (req, res) => {
    const cart = await cartDao.getAll();
    res.json(cart);
};

const cartControllerGetById = async (req, res) => {
    const product = await cartDao.getProductsInCart(req.params.id);
    res.json(product);
};

cartRouter.get('/', cartControllerGet)
cartRouter.get('/:id', cartControllerGetById)

cartRouter.post('/', async (req, res) => {
    const prodAgregado = await cartDao.createCart();
    res.json(prodAgregado)
})

cartRouter.post('/:id', async (req, res) => {
    const prodAgregado = await cartDao.postProductsInCart(req.params.id, req.body);
    res.json(prodAgregado)
    }
)

cartRouter.put('/:id', async (req, res) => {
    const prodActualizado = await cartDao.putProductInCart(req.body);
    res.json(prodActualizado)
})

//borrar todos los productos del carrito
cartRouter.delete('/:id', async (req, res) => {
    const prodEliminados = await cartDao.deleteProductsInCart(req.params.id);
    res.json(prodEliminados)
})

export { cartRouter }