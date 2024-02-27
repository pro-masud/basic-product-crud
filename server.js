import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import multer from "multer";
import user from "./router/user.js";
import productData from "./router/product.js"
import EJSLayouts from "express-ejs-layouts";

// init dotenv config
dotenv.config();

// init express 
const app = express();

// public directory static now
app.use(express.static("public"));

// get Port number here
const PORT = process.env.PORT;

// init ejs here
app.set("view engine", "ejs");
app.use(EJSLayouts);

// json encodead
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// init all router 
app.use(user);
app.use(productData);


// create server within express js
app.listen(PORT, () => {
    console.log(`Server Runing Is Port Number ${PORT}`.bgGreen.black);
});