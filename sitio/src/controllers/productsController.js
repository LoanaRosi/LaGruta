
const fs = require("fs");
const path = require("path");

const products = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"));

let save = (dato) => fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(dato,null,2),'utf-8')

module.exports ={

    // muestra todos los productos y tambien por categoria
	list: (req, res) => {
		return res.render("listProducts")
	},

	// pagina detalle de producto
	detail: (req, res) => {
		let productDetail = products.find(product => product.id === +req.params.id); /* usamos find para que devuelva un objeti literarl en vez de un array como lo aria filter */

		res.render("productDetail",{
			productDetail
		})
	},

	// formulario de creacion de producto
	create: (req, res) => { /* esto solo renderiza la vista */
		res.render("productDetail") 
	},
	
	// metodo para crear el producto
	store: (req, res) => { /* esta manda los datos */
		const {name,price,discount,category,sale} = req.body
		let product ={
			id : products[products.length - 1].id +1,
			name,
			price : +price,
			discount : +discount,
			category,
			sale,
			image : "mesa-2.png"
		}
		products.push(products);
		res.send(products) /* para verificar que manda bien  */

		save(product)

		res.redirect("/products")
	
	},

	// pagina de edicion de producto
	edit: (req, res) => {
		let product = products.find(product=> product.id === +req.params.id)
		res.render("product-edit-form")
    },
	// metodo para subir el producto
	update: (req, res) => {
		const {name,price,discount,category,description} = req.body;
		 products.forEach(product => {
			if (product.id === +req.params.id) { /* recordar poner el +, si no no va a comparar number con string */
				product.name = name;
				product.price = +price;
				product.discount = +discount;
				product.category = category;
				product.description = description;
			}
			
		});
		save(products)
		res.redirect("/products");
	
	},

	// metodo para eliminar un producto
	destroy : (req, res) => {
		let productsModifi = products.filter(product=> product.id !== +req.params.id);  /* fitramos todos los productos menos el producto cuyo id sea igual al id que viene en el params */
		save(productsModifi);
		res.redirect("/products");

	}

}