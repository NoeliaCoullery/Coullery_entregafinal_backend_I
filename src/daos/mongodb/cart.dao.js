import { CartModel } from "./models/cart.model.js";

class CartDaoMongo {
  constructor(model) {
    this.model = model;
  }

  async getCartWithProducts(cid) {
    try {
      return await this.model.findById(cid).populate("products.product");
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProductFromCart(cid, pid) {
    try {
      return await this.model.findByIdAndUpdate(
        cid,
        { $pull: { products: { product: pid } } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCart(cid, products) {
    try {
      return await this.model.findByIdAndUpdate(
        cid,
        { $set: { products: products } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    try {
      return await this.model.updateOne(
        { _id: cid, "products.product": pid },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAllProductsFromCart(cid) {
    try {
      return await this.model.findByIdAndUpdate(
        cid,
        { $set: { products: [] } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProductToCart(cid, pid) {
    try {
      return await this.model.findByIdAndUpdate(
        cid,
        { $push: { product: pid } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const cartDao = new CartDaoMongo(CartModel);
