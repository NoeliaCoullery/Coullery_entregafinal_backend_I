import express from "express";
//import handlebars from 'express-handlebars';
//import path from 'path';
import prodRouter from "./routes/products-router.js";
import cartRouter from "./routes/cart-router.js";
//import viewsRouter from './routes/views-router.js';
//import { Server } from 'socket.io';
//import { productsManager } from './managers/products-manager.js';
import { initMongoDB } from "./daos/mongodb/db.connection.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", prodRouter);
app.use("/carts", cartRouter);

app.use(errorHandler);

const PERSISTENCE = process.env.PERSISTENCE;

if (PERSISTENCE === "MONGO")
  initMongoDB()
    .then(() => console.log("Conectado a la base de datos de MongoDB"))
    .catch((error) => console.log(error));

const PORT = 8080;

app.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT}`));

/*
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(process.cwd(), "src", "public"))); // 

app.engine('handlebars', handlebars.engine()); //
app.set('view engine', 'handlebars'); // 
app.set('views', path.join(process.cwd(), "src", "views")); // 

app.use('/products', prodRouter);
app.use('/api/carts', cartRouter); //
app.use('/', viewsRouter); // 




const httpServer = app.listen(8080, () => console.log("Server ok puerto 8080")); //

const socketServer = new Server(httpServer); //

socketServer.on('connection', async (socket) => { //

    // Emite todos los productos 
    const products = await productsManager.getAllProd(); //
    socket.emit('updateProducts', products); //

    // Captura el emit del cliente, crea el producto, y luego lo emite a todos los clientes
    socket.on('newProd', async (prod) => { //
        await productsManager.createProduct(prod); //
        const products = await productsManager.getAllProd(); //
        socketServer.emit('updateProducts', products); //
    })

    socket.on('deleteProd', async ({ id }) => { //
        await productsManager.deleteProd(id) //
        const products = await productsManager.getAllProd(); // 
        socketServer.emit('updateProducts', products); //
    })
})*/
//todas las importaciones comentadas del ppio estaban en la entrega anterior
