const fs = require("fs");
const path = require("path");

const products = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"));
const banner = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","banner.json"),"utf-8"));

const tothousand = require("../utils/thotousand")
const descuento = require("../utils/discount")

let saveBanner = (dato) => fs.writeFileSync(path.join(__dirname,'..','data','banner.json'),JSON.stringify(dato,null,2),'utf-8')


module.exports ={
    // vista del home
    index : (req,res) =>{
        const productsOfert = products.filter(product=>product.sale === true);
        return res.render("home",{products,productsOfert,banner,descuento,tothousand})

    },

    search: (req,res) => {
        let busqueda = products.filter(product => product.name.toLowerCase().trim().includes(req.query.busqueda.trim().toLowerCase()));
        

        res.render("result-search",{
            tothousand,
            descuento,
            products : busqueda,
            resultado : req.query.busqueda
        })
    },

    // vita del carrito
    cartShop: (req,res) =>{
        return res.render("cart/productCart")
    },

    // vita de detalle de producto
    detail: (req,res) =>{
        return res.render("productDetail")
    },

    admin: (req, res) => {
        const products = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"));
        return res.render("admin/admin",{products})
        
    },

    banner: (req,res) =>{
        return res.render("admin/banner",{banner})
    },

    bannerAdd: (req,res) =>{
        const {imgBanner} = req.body
		let bannerImg ={
			id : banner[banner.length - 1].id +1,
			imgBanner : req.file ? req.file.filename : "default-image.jpg",
		}

		banner.push(bannerImg)
		saveBanner(banner)
		res.redirect("/banner/control")
    },

    bannerDestroy : (req,res) =>{
        let productsModifi = banner.filter(item=> item.id !== +req.params.id);  /* fitramos todos los productos menos el producto cuyo id sea igual al id que viene en el params */
		saveBanner(productsModifi);
		res.redirect("/banner/control");

		
    }
}

