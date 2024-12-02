//import { productsDao } from "../daos/filesystem/products.dao.js";
import { productsDao } from "../daos/mongodb/products.dao.js";
import { CustomError } from "../utils/error.custom.js";

export const getAllProd = async (filter, options) => {
  try {
    const result = await productsDao.getAllProd(filter, options);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const getProdById = async (id) => {
  try {
    const prod = await productsDao.getProdById(id);
    if (!prod) throw new CustomError("Producto no encontrado", 404);
    return prod;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (obj) => {
  console.log("Datos recibidos en el servicio", obj);
  try {
    const newProd = await productsDao.createProduct(obj);
    if (!newProd) throw new CustomError("Error al crear el producto", 400);
    return newProd;
  } catch (error) {
    throw error;
  }
};

export const updateProd = async (id, obj) => {
  try {
    const updatedProducts = await productsDao.updateProd(id, obj);
    if (!updatedProducts)
      throw new CustomError("Error al actualziar el producto", 400);
    return updatedProducts;
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    const deleteProd = await productsDao.deleteProd(id);
    if (!deleteProd)
      throw new CustomError("Error al eliminar el producto", 400);
    return deleteProd;
  } catch (error) {
    throw error;
  }
};
