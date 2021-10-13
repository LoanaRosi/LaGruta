const fs = require("fs");
const path = require("path");

const products = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"));

const banner = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","banner.json"),"utf-8")); // imagenes banner

const tothousand = require("../utils/thotousand")
const descuento = require("../utils/discount")

const db = require("../database/models");

const { Op } = require("sequelize");

module.exports ={
    // vista del home
    index : (req,res) =>{
        const productsOfert = products.filter(product=>product.sale === true);
        return res.render("home",{products,productsOfert,banner,descuento,tothousand})

    },

    search: (req,res) => {

        db.Product.findAll({
            include : [
                "images",
                "categories",
            ],

            where : {
                name : { 
                    [Op.substring] : req.query.busqueda /* Op.substring funciona como un like */
                },
            }
        })
        .then(products =>{
            res.render("result-search",{
                tothousand,
                descuento,
                products,
                resultado : req.query.busqueda
            })
        })
        .catch(error => console.log(error)) 

    },

    // vita del carrito
    cartShop: (req,res) =>{
        return res.render("cart/productCart")
    },

    // vita de detalle de producto
    detail: (req,res) =>{
        return res.render("productDetail")
    },

    contact: (req,res) => {
        res.render("contact")
    },

    about: (req,res) => {
        res.render("about")
    }
}

