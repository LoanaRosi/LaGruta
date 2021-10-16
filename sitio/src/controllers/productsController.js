const fs = require("fs");
const path = require("path");

const banner = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","banner.json"),"utf-8")); // imagenes banner
let saveBanner = (dato) => fs.writeFileSync(path.join(__dirname,'..','data','banner.json'),JSON.stringify(dato,null,2),'utf-8')

const tothousand = require("../utils/thotousand");
const descuento = require("../utils/discount");
const {validationResult} = require('express-validator');

const products = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"));

let save = (dato) => fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(dato,null,2),'utf-8') /* gurada en el json products */

const db = require("../database/models");
const { Op } = require("sequelize");

module.exports ={

    // muestra todos los productos y tambien por categoria
	list: (req, res) => {

		db.Product.findAll({
			include : [
				"images"
			]
		})
		.then(products =>{
			res.render("listProducts",{
				products,
				descuento,
				tothousand
			})
		})
		.catch(error => console.log(error)) 
	},

	// pagina detalle de producto
	detail: (req, res) => {

		let productDetail = db.Product.findByPk(req.params.id,{
			include :[
				{association : "images"},
				{association : "categories"},
				{association : "complexities"},
				{association : "languages"}
			]
		})
		.then((productDetail) =>{
			let productRelacion = db.Product.findAll({
				where : {
					categoryId : productDetail.categoryId
				},
				include : [
					{association : "images"}
				]
			})
			.then((productRelacion) =>{
				res.render("productDetail",{
					productDetail,
					productRelacion,
					descuento,
					tothousand
				})
			})
			
		})
		.catch(error => console.log(error))
	},

	mediosPago: (req, res) => {
		return res.render('medios-pago')
	},

	// formulario de creacion de producto
	create: (req, res) => { /* esto solo renderiza la vista */
		let categories = db.Category.findAll()
		let status = db.Status.findAll()
		let complexities = db.Complexity.findAll()
		let languages = db.Language.findAll()

		Promise.all([categories,status,complexities,languages])
		.then(([categories,status,complexities,languages]) =>{
			
			res.render("admin/create",{
				categories,
				status,
				complexities,
				languages
			})
		})
		.catch(error => console.log(error))
	},
	
	// metodo para crear el producto
	store: (req, res) => { /* esta manda los datos */
		let errors = validationResult(req);
		if(errors.isEmpty()){
		const {name,price,category,discount,sale,autor,mecanica,tematica,jugadores,tiempo,complejidad,editorial,idioma,contenido,} = req.body

		db.Product.create({
			name : name.trim(),
			price : price,
			discount : discount,
			player : jugadores.trim(),
			timeGame : tiempo.trim(),
			author : autor.trim(),
			publisher : editorial.trim(),
			thematic : tematica.trim(),
			content : contenido.trim(),
			mechanic : mecanica.trim(),
			statusId : sale,
			complexityId : complejidad,
			categoryId : category,
			laguageId : idioma,
			
		})
		.then(product =>{ 
			console.log(product);

			if(req.files.length != 0){
				let images = req.file.map(image =>{
					let item = {
						file : image.filename,
						productId : product.id /* esto lo saca de then de arriba, el de product*/
					}
					return item
				})
				db.Image.bulkCreate(images,{validate : true})
				.then( () => console.log('imagenes guardadas'))
			}

			res.redirect("/product/list")
		})
		.catch(error => console.log(error))
	} else {

		let categories = db.Category.findAll()
		let status = db.Status.findAll()
		let complexities = db.Complexity.findAll()
		let languages = db.Language.findAll()
		let products = db.Product.findAll()

		Promise.all([categories,status,complexities,languages,products])
		.then(([categories,status,complexities,languages,products]) =>{
			
			res.render("admin/create",{
				categories,
				status,
				complexities,
				languages,
				products,
				errors : errors.mapped(),
				old : req.body
			})
		})
		.catch(error => console.log(error))
	  }
	
	},

	// pagina de edicion de producto
	edit : (req,res) => {
			return res.render('admin/edit',{
				product : products.find(product => product.id === +req.params.id),
			})
	},


	// metodo para subir el producto editado
	update: (req, res) => {
		const {name,price,category,discount,sale,autor,mecanica,tematica,jugadores,tiempo,medidas,complejidad,editorial,idioma,contenido} = req.body;
		 products.map(product => {
			if (product.id === +req.params.id) { /* recordar poner el +, si no no va a comparar number con string */
				product.name = name;
				product.price = +price;
				product.category = category;
				product.img = req.file ? req.file.filename : product.img;
				product.discount = +discount;
				product.sale = sale ? true : false;
				product.autor =  autor.trim(),
				product.mecanica =  mecanica.trim(),
				product.tematica =  tematica.trim(),
				product.jugadores =  jugadores.trim(),
				product.tiempo =  tiempo.trim(),
				product.medidas =  medidas.trim(),
				product.complejidad =  complejidad,
				product.editorial =  editorial.trim(),
				product.idioma =  idioma,
				product.contenido =  contenido.trim()
				
			}
			
		});
		save(products)
		res.redirect("/admin");
    },

	// metodo para eliminar un producto
	destroy : (req, res) => {
		let productsModifi = products.filter(product=> product.id !== +req.params.id);  /* fitramos todos los productos menos el producto cuyo id sea igual al id que viene en el params */
		save(productsModifi);
		res.redirect("/admin");

	},

	// control del banner

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
		res.redirect("/product/banner")
    },

    bannerDestroy : (req,res) =>{
        let productsModifi = banner.filter(item=> item.id !== +req.params.id);  /* fitramos todos los productos menos el producto cuyo id sea igual al id que viene en el params */
		saveBanner(productsModifi);
		res.redirect("/product/banner");

		
    }


}