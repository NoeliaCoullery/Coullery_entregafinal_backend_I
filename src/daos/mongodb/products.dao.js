import { ProductModel } from "./models/product.model.js";

class ProductDaoMongo {
  constructor(model) {
    this.model = model;
  }

  async getAllProd(filter, options) {
    try {
      const { limit, page, sort } = options;
      const queryOptions = {
        limit: limit,
        page: page,
        sort: sort
      };
      const result = await this.model.paginate(filter, queryOptions);
      return {
        products: result.docs,
        totalProducts: result.totalDocs,
        totalPages: result.totalPages,
        currentPage: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage, 
        prevPage: result.prevPage, 
        nextPage: result.nextPage
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProdById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async createProduct(obj) {
    console.log("Datos recibidos en el DAO:", obj);
    try {
      return await this.model.create(obj);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProd(id, obj) {
    try {
      return await this.model.findByIdAndUpdate(id, obj, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProd(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const productsDao = new ProductDaoMongo(ProductModel);
