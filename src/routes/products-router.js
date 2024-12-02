import { Router } from "express";
//import  productsManager  from "../daos/mongodb/products.dao.js";
//import validateProduct from '../middlewares/validateProduct.js';
import * as controllers from "../controllers/product.controllers.js";

const prodRouter = Router();

prodRouter.get("/", controllers.getAllProd);

prodRouter.get("/:pid", controllers.getProdById);

prodRouter.post("/", controllers.createProduct);

prodRouter.put("/:pid", controllers.updateProd);

prodRouter.delete("/:pid", controllers.deleteProd);

export default prodRouter;
