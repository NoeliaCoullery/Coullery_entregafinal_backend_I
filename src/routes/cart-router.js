import { Router } from 'express';
import * as controllers from '../controllers/cart.controllers.js';

const cartRouter = Router();

cartRouter.get('/:cid', controllers.getCartWithProducts);

cartRouter.delete('/:cid/products/:pid', controllers.deleteProductFromCart);

cartRouter.put('/:cid', controllers.updateCart);

cartRouter.put('/:cid/products/:pid', controllers.updateProductQuantity);

cartRouter.delete('/:cid', controllers.deleteAllProductsFromCart);

cartRouter.post('/add/:cid/:pid', controllers.addProductToCart);

export default cartRouter;






/*import { Router } from "express";
import { cartManager } from "../managers/cart-manager.js";

const cartRouter = Router();

cartRouter.post('/', async (req, res) => {
    try {
        res.json(await cartManager.createCart());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

cartRouter.get('/', async (req, res) =>{
    try {
        res.json(await cartManager.getAllCarts());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

cartRouter.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        res.json(await cartManager.getCartById(cid));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        res.json(await cartManager.addToCart(cid, pid));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


export default cartRouter;*/
//es todo el codigo de la entrega pasada