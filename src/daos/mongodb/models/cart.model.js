import { Schema, model } from 'mongoose';
import { productsCollectionName } from './product.model.js';

const CartSchema = new Schema({
    products: [{
        product: { type: Schema.Types.ObjectId, ref: productsCollectionName, require: true }, // o ref product
        quantity: { type: Number, required: true }
    }]
}, { default: [] });

export const CartModel = model('Cart', CartSchema);
