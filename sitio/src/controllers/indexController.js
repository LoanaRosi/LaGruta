const fs = require("fs");
const path = require("path");

const products = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"));
const banner = require(path.join(__dirname,"..","data","banner.json"))

let saveBanner = (dato) => fs.writeFileSync(path.join(__dirname,'..','data','banner.json'),JSON.stringify(dato,null,2),'utf-8')

module.exports ={
    // vista del home
    index : (req,res) =>{
        const productsOfert = products.filter(product=>product.sale === true);
        return res.render("home",{products, productsOfert,banner})

    },

    // vita del carrito
    cartShop: (req,res) =>{
        return res.render("cart/productCart")
    },

    admin: (req, res) => {
        return res.render("admin/admin", {products})
        
    },

    banner: (req,res) =>{
        return res.render("admin/banner",{banner})
    },

    bannerAdd: (req,res) =>{
       if (req.file) {
        banner.push(req.file.filename)
        saveBanner(banner)
       }
       return res.redirect("/banner/control")
    }
}

