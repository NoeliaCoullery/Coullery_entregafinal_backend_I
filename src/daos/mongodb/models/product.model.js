import { Schema , model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

export const productsCollectionName = "product";

const ProductSchema = new Schema ({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: [true , 'el precio es requerido'] },
    stock: { type: Number, required: true },
    category: { type: [String], required: true }
   });

ProductSchema.plugin(mongoosePaginate);

//borrar lo que sigue si funciona
ProductSchema.pre('save', function(next) { 
    if (!this.name) next(new Error('Name is required')); 
    if (!this.description) next(new Error('Description is required')); 
    if (!this.price) next(new Error('Price is required')); 
    if (!this.stock) next(new Error('Stock is required')); 
    if (!this.category) next(new Error('Category is required')); next();
});
export const ProductModel = model(productsCollectionName, ProductSchema);

//con el ProductModel vas a ir a la collection 'product' y vas a utilizar este shcema