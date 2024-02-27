import express from "express";
import { createProduct, deleteSingleProduct, getAllProduct, getSingleProduct, showCreatePage, showEditePage, showProductPage, showSinglePage, showUpdateProduct } from "../controller/createProductController.js";
import { productImageFileUpload } from "../util/multer.js";

// init express js router
const router = express.Router();



router.get("/", showProductPage);
router.get("/create", showCreatePage);
router.get("/single/:slug", showSinglePage);
router.get("/edite/:id", showEditePage);
router.post("/update/:id", productImageFileUpload, showUpdateProduct);

// express api
router.get("/product/:slug", getSingleProduct);
router.get("/product-item/:id", deleteSingleProduct);
router.post("/product", productImageFileUpload, createProduct);

// export express router
export default router;