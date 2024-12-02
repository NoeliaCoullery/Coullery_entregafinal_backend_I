import { connect } from "mongoose";
import "dotenv/config";

//const MONGO_URL = 'mongodb://localhost27017/ecommercebackend'; por consola
//const MONGO_URL = 'mongodb+srv://admin:yTPhdVYw3zI1cyVu@cluster0.7eslv.mongodb.net/ecommercebackend?retryWrites=true&w=majority&appName=Cluster0';
//mongo en la nube
const MONGO_URL = process.env.MONGO_URL;

//console.log(MONGO_URL);

export const initMongoDB = async () => {
  try {
    await connect(MONGO_URL);
    console.log("conectado a mongo");
  } catch (error) {
    throw new Error(error);
  }
};
