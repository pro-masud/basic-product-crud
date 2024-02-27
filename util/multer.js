import multer from "multer";

// create multer file system management
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       if(file.fieldname === "userPhoto"){
            cb(null, "public/users");
        }else if(file.fieldname === "productPhoto"){
            cb(null, "public/product");
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() +"_"+ Math.floor(Math.random() * 10000) + "_" + file.originalname);
    }
});

// init file router here
export const userImageFileUpload = multer({storage}).single('userPhoto');
export const customerImageFileUpload = multer({storage}).single('customerPhoto');
export const productImageFileUpload = multer({storage}).single('productPhoto');