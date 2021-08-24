
const fs = require("fs");
const path = require("path");

const tothousand = require("../utils/thotousand")
const descuento = require("../utils/descount")

const products = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"));

let save = (dato) => fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(dato,null,2),'utf-8') /* gurada en el json products */

module.exports ={

    // muestra todos los productos y tambien por categoria
	list: (req, res) => {
		return res.render("listProducts",{products,descuento,tothousand})
	},

	// pagina detalle de producto
	detail: (req, res) => {
		let productDetail = products.find(product => product.id === +req.params.id); /* usamos find para que devuelva un objeti literarl en vez de un array como lo aria filter */

		return res.render("productDetail",{
			productDetail
		})
	},

	// formulario de creacion de producto
	create: (req, res) => { /* esto solo renderiza la vista */
		res.render("admin/create") 
	},
	
	// metodo para crear el producto
	store: (req, res) => { /* esta manda los datos */
		const {name,price,category,discount,sale} = req.body
		let product ={
			id : products[products.length - 1].id +1,
			name : name.trim(),
			price : +price,
			category,
			img : req.file ? req.file.filename : "default-image.jpg",
			discount : +discount,
			sale
		}

		products.push(product)
		save(products)
		res.redirect("/list/products")
	
	},

	// pagina de edicion de producto
	edit : (req,res) => {
			return res.render('admin/edit',{
				product : products.find(product => product.id === +req.params.id),
			})
	},


	// metodo para subir el producto editado
	update: (req, res) => {
		const {name,price,category,discount,sale,img} = req.body;
		 products.map(product => {
			if (product.id === +req.params.id) { /* recordar poner el +, si no no va a comparar number con string */
				product.name = name;
				product.price = +price;
				product.category = category;
				product.img = req.file ? req.file.filename : product.img;
				product.discount = +discount;
				product.sale = sale ? true : false;
				
			}
			
		});
		save(products)
		res.redirect("/admin/admin");
    },

	// metodo para eliminar un producto
	destroy : (req, res) => {
		let productsModifi = products.filter(product=> product.id !== +req.params.id);  /* fitramos todos los productos menos el producto cuyo id sea igual al id que viene en el params */
		save(productsModifi);
		res.redirect("/admin/admin");

	}

}