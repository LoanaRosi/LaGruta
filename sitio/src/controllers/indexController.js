const fs = require("fs");
const path = require("path");

const products = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"));

module.exports ={
    // vista del home
    index : (req,res) =>{
        const productsOfert = products.filter(product=>product.sale === true);
        return res.render("home",{products, productsOfert})
    },

    // vita del carrito
    cartShop: (req,res) =>{
        return res.render("productCart")
    }
}