const fs = require("fs");
const path = require("path");
const db = require('../database/models');

/* const banner = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","banner.json"),"utf-8")); // imagenes banner
let saveBanner = (dato) => fs.writeFileSync(path.join(__dirname,'..','data','banner.json'),JSON.stringify(dato,null,2),'utf-8') */

const tothousand = require("../utils/thotousand");
const descuento = require("../utils/discount");
const {validationResult} = require('express-validator');

const { Op } = require("sequelize");

const queryInterface = db.sequelize.getQueryInterface();

module.exports ={

    // muestra todos los productos y tambien por categoria
	list: (req, res) => {

		db.Product.findAll({
			include : [
				"images"
			]
		})
		.then(products =>{
			return res.render("listProducts",{
				products,
				descuento,
				tothousand
			})
		})
		.catch(error => console.log(error)) 
	},

	listMesa : (req,res) =>{
		db.Product.findAll({
			include : [
				"images"
			],
			where :{
				categoryId : 1
			}
		})
		.then(products =>{
			res.render("juegos-mesa",{
				products,
				descuento,
				tothousand
			})
		})
		.catch(error => console.log(error)) 
	},

	listPrevia : (req,res) =>{
		db.Product.findAll({
			include : [
				"images"
			],
			where :{
				categoryId : 3
			}
		})
		.then(products =>{
			res.render("juegos-previa",{
				products,
				descuento,
				tothousand
			})
		})
		.catch(error => console.log(error)) 
	},

	listRol : (req,res) =>{
		db.Product.findAll({
			include : [
				"images"
			],
			where :{
				categoryId : 2
			}
		})
		.then(products =>{
			res.render("juegos-rol",{
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
	store: (req, res) => { /* esto manda los datos */
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
			if(req.files.length != 0){
				let images = req.files.map(image =>{
					let item = {
						file : image.filename,
						productId : product.id /* esto lo saca de then de arriba, el de product*/
					}
					return item
				})
				db.Image.bulkCreate(images,{validate : true})
				.then( () => {
					return res.redirect("/product/list")
					console.log('imagenes guardadas')})
			}else{
				db.Image.create({file:'default-image.jpg', productId:product.id})
				.then(() => res.redirect("/product/list")) 
			}

			/* return res.redirect("/product/list") */
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
				mechanic : products.mechanic,
				thematic : products.thematic,
				publisher : products.publisher,
				timeGame : products.timeGame,
				player : products.player,
				errors : errors.mapped(),
			})
		})
		.catch(error => console.log(error))
	  }
	
	},

	// pagina de edicion de producto
	edit : (req,res) => {
		let categories = db.Category.findAll()
		let status = db.Status.findAll()
		let complexities = db.Complexity.findAll()
		let languages = db.Language.findAll()		
		let product = db.Product.findByPk(req.params.id, { 
			include: ['categories', 'images', 'status','complexities', 'languages']
		})
		Promise.all(([categories, status, complexities, languages, product]))
		.then(([categories, status, complexities, languages, product]) => {
			return res.render('admin/edit',{
				categories,
				status,
				complexities,
				languages,
				product
			})
		})
		.catch(error => console.log(error))		
	},


	// metodo para subir el producto editado
	update: (req, res) => {
		let errors = validationResult(req);

        if(errors.isEmpty()){

			const {name,price, discount,autor,mecanica,tematica,editorial,tiempo,complejidad,idioma,jugadores,contenido,sale,category} = req.body;
			db.Product.update(
				{
					name : name.trim(),
					price : price,
					discount : discount,
					author : autor.trim(),
					mechanic : mecanica.trim(),
					thematic : tematica.trim(),
					publisher : editorial.trim(),
					timeGame : tiempo.trim(),
					complexityId : complejidad,
					laguageId : idioma,
					player : jugadores.trim(),			
					content : contenido.trim(),			
					statusId : sale,			
					categoryId : category,			
				},
				{
					where : {
						id : req.params.id
					}
				}
			)
			.then( () =>{

			/* let images = req.files

			console.log(">>>>>>>>>>>>>>>",images)
				db.Image.update({
					file : images.filename
				},{
					where : {
						productId : req.params.id
					}
				})
				.then( () =>{
				}) */


				db.Product.findByPk(req.params.id, {
					include: ['images']
				})
					.then(async product => {
						 if (req.files.length != 0) {
							 const {img} = req.body // TRAE LAS IMAGENES
							console.log(">>>>>>>",img)

							/* product.images.forEach(image => {

								if (fs.existsSync(path.join(__dirname, '../public/images/productos', image.file))) {
									fs.unlinkSync(path.join(__dirname, '../public/images/productos', image.file))
								}
							}); */

							await queryInterface.bulkDelete('images', {
								productId: product.id
							});

							let images = req.files.map(image => {
								let item = {
									file: image.filename,
									productId: product.id
								}
								return item
							})

							db.Image.bulkCreate(images, { validate: true })
								.then(() =>{
								return res.redirect("/user/admin");
							})
						}
						
					})
					
				return res.redirect("/user/admin");
			})
			.catch(error => console.log(error))

			} else {
				let categories = db.Category.findAll()
				let status = db.Status.findAll()
				let complexities = db.Complexity.findAll()
				let languages = db.Language.findAll()		
				let product = db.Product.findByPk(req.params.id, { 
					include: ['categories', 'images', 'status','complexities', 'languages']
				})
				Promise.all(([categories, status, complexities, languages, product]))
				.then(([categories, status, complexities, languages, product]) => {
					return res.render('admin/edit',{
						categories,
						status,
						complexities,
						languages,
						product,
						errors : errors.mapped(),
					})
				})
				.catch(error => console.log(error))		
				
			  }			
			},

	// metodo para eliminar un producto
	destroy : (req, res) => {
		db.Product.destroy({
			where : {
				id : req.params.id
			}					
			})	
			.then(() => {
				return res.redirect("/user/admin");

			})	 
			.catch(error => console.log(error))	
			},

	// control del banner

	banner: (req,res) =>{
		db.Banner.findAll()
		.then(banner => {
			res.render("admin/banner",{banner})
		})
    },

    bannerAdd: (req,res) =>{

		db.Banner.create({
			name : req.file ? req.file.filename : "default-image.jpg",
		})
		res.redirect("/product/banner")
    },

    bannerDestroy : (req,res) =>{

		db.Banner.destroy({
			where : {
				id : req.params.id
			}
		})
		.then( () =>{
			return res.redirect("/product/banner");
		})
		.catch(error => console.log(error))	
		
    }


}