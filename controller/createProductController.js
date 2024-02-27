import fs from "fs";
import { createProductSlug, generateMongoId } from "../helper/helper.js";
export const getAllProduct = (req, res) => {

    // create json db database within product data
    const prodateData = JSON.parse(fs.readFileSync("db/product.json").toString());

    if(prodateData.length === 0){
        res.status(400).json({message: "Product Not Found !!!"});
        return;
    }
    res.status(200).json(prodateData);
}




export const getSingleProduct = (req, res) => {
    const { slug } = req.params;
    console.log(slug);

    // create json db database within product data
    const prodateData = JSON.parse(fs.readFileSync("db/product.json").toString());

    const singleProduct = prodateData.find((data) => data.slug === slug);

    if(!prodateData){
        res.singleProduct(400).json({message: "Product Data Not Found"});
        return;
    }else{
        res.status(400).json(singleProduct);
    }
}



export const createProduct = (req, res) => {
    const {name, regularPrice, selaPrice, stock, productPhoto} = req.body;

    // user input validation
    if(!name || !regularPrice){
        res.status(400).json({message: "Fields Must Not Be Empty !!!"});
        return;
    }
    // create json db database within product data
    const prodateData = JSON.parse(fs.readFileSync("db/product.json").toString());


    // checked Slug 
    if(prodateData.some(data => data.slug === createProductSlug(name))){
        res.status(400).json({message: "All Ready This slug Database"});
        return;
    }

    // create product data structure
    const productSingleData = {
        id: generateMongoId(),
        name,
        slug: createProductSlug(name),
        regularPrice,
        selaPrice,
        stock,
        productPhoto: req.file.filename
    }


    // single product data push data base
    prodateData.push(productSingleData);


    fs.writeFileSync("db/product.json", JSON.stringify(prodateData));

    res.status(201).redirect('/');
}


export const deleteSingleProduct = (req, res) => {
    const { id } = req.params;

    // create json db database within product data
    const prodateData = JSON.parse(fs.readFileSync("db/product.json").toString());

    const updateProductData = prodateData.filter((data) => data.id !== id);

    fs.writeFileSync("db/product.json", JSON.stringify(updateProductData));
    res.redirect('/');
}



// show all product page
export const showProductPage = (req, res) => {
     // get all product data here
     const prodateData = JSON.parse(fs.readFileSync("db/product.json").toString());
    res.render("view", {
        products: prodateData
    });
}


// go to single page 

export const showSinglePage =  (req, res) => {
    const { slug } = req.params;

    // get all data here
    const prodateData = JSON.parse(fs.readFileSync("db/product.json").toString());

    // find single data to json database
    const singleData = prodateData.find(data => data.slug === slug);
    res.render("single", {
        product: singleData
    });
}

// go to single page 

export const showCreatePage =  (req, res) => {
    res.render("create");
}


// edite product page
export const showEditePage =  (req, res) => {
    const { id } = req.params;

    // get all data here
    const prodateData = JSON.parse(fs.readFileSync("db/product.json").toString());

    // find single data to json database
    const updateData = prodateData.find(data => data.id === id);
    res.render("edite", {
        product: updateData
    });
}

export const showUpdateProduct = (req, res) => {
    // get data update form 
    const {name, regularPrice, selaPrice, stock, productPhoto} = req.body;
    const { id } = req.params;


    const updateProdateData = JSON.parse(fs.readFileSync("db/product.json").toString());

    // get photo name here
    let photo_name = updateProdateData[updateProdateData.findIndex((data) => data.id === id)].productPhoto;
    if(req.file?.filename){
        photo_name = req.file.filename;
    }
    updateProdateData[updateProdateData.findIndex((data) => data.id === id)] = {
        id,
        name,
        slug: createProductSlug(name),
        regularPrice,
        selaPrice,
        stock,
        productPhoto: photo_name
    }

    fs.writeFileSync("db/product.json", JSON.stringify(updateProdateData));
    res.redirect('/');
}