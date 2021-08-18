

module.exports ={

    // muestra todos los productos y tambien por categoria
	list: (req, res) => {
		return res.render("listProducts")
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		/* let productDetail = products.find(product => product.id === +req.params.id); */ /* usamos find para que devuelva un objeti literarl en vez de un array como lo aria filter */

		res.render("productDetail")
	},

	// Create - Form to create
	create: (req, res) => { /* esto solo renderiza la vista */
		res.render("productDetail")
	},
	
	// Create -  Method to store
	store: (req, res) => { /* esta manda los datos */
		const {name,price,discount,category,description} = req.body
		let product ={
			id : products[products.length - 1].id +1,
			name,
			price : +price,
			discount : +discount,
			category,
			description,
			image: "default-image.png"
		}
		products.push(product);
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2),"utf-8")
		res.redirect("/products")
	
	},

	// Update - Form to edit
	edit: (req, res) => {
		let product = products.find(product=> product.id === +req.params.id)
		res.render("product-edit-form")
    },
	// Update - Method to update
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
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2),"utf-8");
			res.redirect("/products");
	
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productsModi = products.filter(product=> product.id !== +req.params.id)  /* fitramos todos los productos menos el producto cuyo id sea igual al id que viene en el params */
		fs.writeFileSync(productsFilePath,JSON.stringify(productsModi,null,2),"utf-8")
		res.redirect("/products")

	}

}