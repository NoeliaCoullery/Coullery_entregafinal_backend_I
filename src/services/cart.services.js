import { cartDao } from "../daos/mongodb/cart.dao.js";
import { productsDao } from "../daos/mongodb/products.dao.js";
import { CustomError } from "../utils/error.custom.js";
import * as productsServices from "../services/products.services.js";

export const getCartWithProducts = async (cid) => {
  try {
    const cart = await cartDao.getCartWithProducts(cid);
    if (!cart) throw new CustomError("Carrito no encontrado", 400);
    return cart;
  } catch (error) {
    throw error;
  }
};

export const deleteProductFromCart = async (cid, pid) => {
  try {
    const result = await cartDao.deleteProductFromCart(cid, pid);
    if (result.nModified === 0)
      throw new CustomError("Producto no encontrado en el carrito", 400);
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateCart = async (cid, products) => {
  try {
    return await cartDao.updateCart(cid, products);
  } catch (error) {
    throw error;
  }
};

export const updateProductQuantity = async (cid, pid, quantity) => {
  try {
    return await cartDao.updateProductQuantity(cid, pid, quantity);
  } catch (error) {
    throw error;
  }
};

export const deleteAllProductsFromCart = async (cid) => {
  try {
    return await cartDao.deleteAllProductsFromCart(cid);
  } catch (error) {
    throw error;
  }
};

export const addProductToCart = async (cid, pid) => {
  try {
    await productsServices.getProdById(pid);
    const cartUpd = await cartDao.addProductToCart(cid, pid);
    if (!cartUpd) throw new CustomError("Error al agregar un producto", 404);
    return cartUpd;
  } catch (error) {
    throw error;
  }
};
