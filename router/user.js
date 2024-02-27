import express from "express";
import { createUserMiddleware } from "../controller/createUserMiddleware.js";
import { userImageFileUpload } from "../util/multer.js";



// init express router here
const router = express.Router();

router.post("/user", userImageFileUpload, createUserMiddleware);

// export default router
export default router;