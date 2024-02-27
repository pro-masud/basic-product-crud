import { generateMongoId } from "../helper/helper.js";
import fs from "fs";

export const createUserMiddleware = (req, res) => {
    const {name, regularPrice, selaPrice, stock, userPhoto} = req.body;
   
    // user name and image not uploading validation
    if(!name || !regularPrice){
        res.status(400).json({message: "Fields Must Not Be Empty !!!"});
        return;
    }

    // get data for jsondb Database 
    const UserData = JSON.parse(fs.readFileSync("db/database.json").toString());
    // create user DataStcuerh put to database
    const userSingleData = {
        id: generateMongoId(),
        name,
        regularPrice,
        selaPrice,
        stock,
        userPhoto: req.file.filename
    }

    // push data to jsonbd database
    UserData.push(userSingleData);


    // json db database writing here
    fs.writeFileSync("db/database.json", JSON.stringify(UserData));
    res.status(201).json({
        UserData,
        message: "Send User Data Successfully"
    });
}