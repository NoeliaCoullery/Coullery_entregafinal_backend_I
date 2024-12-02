
import * as services from '../services/products.services.js';


export const getAllProd = async (req, res, next) => {
    try {
        const { limit = 10, page = 1, query , sort } = req.query;
        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {}
        };
        const filter = query ? { $or: [{ category: query}, {availability: query} ]}: {};
        const result = await services.getAllProd(filter, options);

        const { products, totalPages, currentPage, hasPrevPage, hasNextPage, prevPage, nextPage } = result; 
        const response = { 
            status: "success", 
            payload: products, 
            totalPages, 
            prevPage, 
            nextPage, 
            page: currentPage, 
            hasPrevPage, 
            hasNextPage, 
            prevLink: hasPrevPage ? `/products?limit=${limit}&page=${prevPage}&query=${query}&sort=${sort}` : null, 
            nextLink: hasNextPage ? `/products?limit=${limit}&page=${nextPage}&query=${query}&sort=${sort}` : null
        };
        res.json(response);
        } catch (error) {
        next(error);
        }
    };

   
export const getProdById = async (req, res, next) => {
    try {
    const { id } = req.params; 
    const product = await services.getProdById(id);
    res.json(product);
} catch (error) {
 next(error);
}
};

export const createProduct = async (req, res, next) => {
        try {
            console.log('Datos recibidos', req.body);
            const newProduct = await services.createProduct(req.body);
        res.json(newProduct);
} catch (error) {
 next(error);
 } 
        };

        
export const updateProd = async (req, res, next) => {
    try {
    const { id } = req.params; // o id
    const updatedProduct = await services.updateProd(id, req.body); // o id
    res.json(updatedProduct);
    } catch (error) {
     next(error);
     }
};
        


            
export const deleteProd = async (req, res, next) => { //ver si hay que cambiar el deleteProd por remove
try {
    const { id } = req.params;
    const deletedProduct = await services.remove(id);
    res.json(deletedProduct);
    } catch (error) {
        next(error);
    }
};

            //import productsManager from "../daos/mongodb/products.dao.js";
/*export const getAllProd = async (req, res, next) => {
    try {
        const products = await services.getAllProd();
        const { limit } = req.query;
        const limitedProducts = limit ? products.slice(0, parseInt(limit)) : products;
        res.status(200).json(limitedProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}*/

/*export const getProdById = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const product = await services.getProdById(pid);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }*/

/*export const createProduct = async (req, res, next) => {
    try {
        const newProduct = await services.createProduct({
            ...req.body,
            thumbnails: req.body.thumbnails
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }*/

        /*export const updateProd = async (req, res, next) => {
            try {
                const { pid } = req.params;
                const updatedProduct = await services.updateProd(pid, req.body);
                res.status(200).json(updatedProduct);
            } catch (error) {
                res.status(404).json({ message: error.message });
            }*/


        /*export const deleteProd = async (req, res, next) => {
            try {
                const { pid } = req.params;
                const deletedProduct = await services.remove(pid);
                res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
            } catch (error) {
                res.status(404).json({ message: error.message });
            }*/
