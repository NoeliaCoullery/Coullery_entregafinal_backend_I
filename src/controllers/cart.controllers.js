import * as services from '../services/cart.services.js';

export const getCartWithProducts = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await services.getCartWithProducts(cid);
        res.json(cart);
    } catch (error) {
        next(error);
    }
};

export const deleteProductFromCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        await services.deleteProductFromCart(cid, pid);
        res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
        next(error);
    }
};

export const updateCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        await services.updateCart(cid, req.body.products);
        res.status(200).json({ message: 'Carrito actualizado' });
    } catch (error) {
        next(error);
    }
};

export const updateProductQuantity = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        await services.updateProductQuantity(cid, pid, quantity);
        res.status(200).json({ message: 'Cantidad actualizada' });
    } catch (error) {
        next(error);
    }
};

export const deleteAllProductsFromCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        await services.deleteAllProductsFromCart(cid);
        res.status(200).json({ message: 'Se eliminaron todos los productos' });
    } catch (error) {
        next(error);
    }
};

export const addProductToCart = async(req, res, next) => {
    try {
    const { cid } = req.params;
    const { pid } = req.params;
    const newProductToCart = await services.addProductToCart(cid, pid)
    res.json(newProductToCart);
    } catch (error){
        next(error);
    }
}

