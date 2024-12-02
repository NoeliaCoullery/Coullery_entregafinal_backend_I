import fs from 'node:fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

class ProductDaoFS {
    constructor(path) {
        this.path = path;
    }

    async createProduct(obj) {
        try {
            const product = {
                id: uuidv4(),
                ...obj
            };
            const products = await this.getAllProd();
            if(!Array.isArray(products)) {
                throw new Error('Error al obtener la lista de productos');
            }
            const existingProduct = products.find(p => p.id === product.id);
            if (existingProduct) throw new Error('existing product');
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAllProd() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, 'utf-8');
                return products ? JSON.parse(products) : [];
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getProdById(id) {
        try {
            const products = await this.getAllProd();
            const productFound = products.find(p => p.id === id);
            if (!productFound) throw new Error('product not found');
            return productFound;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateProd(id, obj) {
        try {
            const products = await this.getAllProd();
            let prod = await this.getProdById(id);
            prod = { ...prod, ...obj }
            const newProdList = products.filter((prod) => prod.id !== id);
            newProdList.push(prod);
            await fs.promises.writeFile(this.path, JSON.stringify(newProdList));
            return prod;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteProd(id) {
        try {
            const prod = await this.getProdById(id);
            const products = await this.getAllProd();
            const newProdList = products.filter((prod) => prod.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(newProdList));
            return prod;
        } catch (error) {
            throw new Error(error);
        }
    }

    /*async deleteAllProd() {
        try {
            const products = await this.getAll();
            if (!products.length > 0) throw new Error("products is empty");
            await fs.promises.unlink(this.path);
        } catch (error) {
            throw new Error(error);
        }
    }*/

}


export const productsDao = new ProductDaoFS(path.join(process.cwd(), 'src/daos/filesystem/data/products.json'));