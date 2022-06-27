import { Router } from 'express';
import { productsDao } from '../daos/products/index.js'

const productsRouter = Router();

const productsControllerGet = async (req, res) => {
    try{
        const products = await productsDao.getAll();
        res.json(products);
    } catch(err){
        res.status(500).json({ message: err.message });
    }
};

const productsControllerGetById = async (req, res) => {
    try{
    const product = await productsDao.getById(req.params.id);
    res.json(product);
    } catch(err){
        res.status(500).json({ message: err.message });
    }
};

const productsControllerPost = async (req, res) => {
    const prodAgregado = await productsDao.save(req.body);
    res.json(prodAgregado)
}

const productsControllerPut = async (req, res) => {
    const prodActualizado = await productsDao.setById(req.params.id, req.body);
    res.json(prodActualizado)
}

const productsControllerDelete = async (req, res) => {
    const prodEliminado = await productsDao.deleteById(req.params.id);
    res.json(prodEliminado)
}


productsRouter.get('/', productsControllerGet)
productsRouter.get('/:id', productsControllerGetById)
productsRouter.post('/', productsControllerPost)
productsRouter.put('/:id', productsControllerPut)
productsRouter.delete('/:id', productsControllerDelete)



export { productsRouter }