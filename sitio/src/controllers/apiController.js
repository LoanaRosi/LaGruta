const db = require("../database/models");

const throwError = (res, error) => {
    return res.status(error.status || 500).json({
        status: error.status || 500,
        errors: error.errors
    })
}

module.exports = {
    changeImage: (req, res) => {
        console.log(req.params.id)
        console.log(req.files)
        db.Image.update(
            {
                file: req.files[0].filename
            },
            {
                where: { id: req.params.id }
            }
        )
            .then( () => res.status(200).json('imagen actualizada!'))
            .catch( error => console.log(error))
    },

    getCategories: async (req, res) => {
        try {
            let categorias = await db.Category.findAll({
                order: [
                    ['name', 'ASC']
                ]
            })

            let response = {
                status: 200,
                meta: {
                    total: categorias.length,
                    link: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: categorias
            }
            return res.status(200).json(response)
        } catch (error) {
            throwError(res, error)
        }
    },

    getProducts: async (req, res) => {
        console.log(req.query)
        let products;
        let totalProducts;
        let offset = +req.query.limit * (+req.query.current - 1);
        try {
            if (+req.query.filter !== 0 && req.query.search) {
                products = await db.Product.findAll({
                    where: {
                        categoryId: req.query.filter,
                        name: {
                            [Op.substring]: req.query.search
                        }
                    },
                    order: [
                        [req.query.order || 'id']
                    ],
                    limit: +req.query.limit,
                    include: ['images', 'category'],
                    offset

                })
                totalProducts = await db.Product.count({
                    where: {
                        categoryId: req.query.filter,
                        name: {
                            [Op.substring]: req.query.search
                        }
                    },
                })
            } else if (+req.query.filter !== 0) {
                products = await db.Product.findAll({
                    where: {
                        categoryId: req.query.filter,
                    },
                    order: [
                        [req.query.order || 'id']
                    ],
                    limit: +req.query.limit,
                    include: ['images', 'category'],
                    offset
                })
                totalProducts = await db.Product.count({
                    where: {
                        categoryId: req.query.filter,
                    },
                })
            } else {
                products = await db.Product.findAll({
                    limit: +req.query.limit,
                    order: [
                        [req.query.order || 'id']
                    ],
                    include: ['images', 'category'],
                    offset
                })
                totalProducts = await db.Product.count()
            }

            let response = {
                status: 200,
                meta: {
                    total: totalProducts,
                    link: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: products
            }
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            throwError(res, error)
        }
    },
    getAllProduct: async (req, res) => {
        try {
            let products = await db.Product.findAll({
                include: ['images', 'category'],
            })

            let response = {
                status: 200,
                meta: {
                    total: products.length,
                    link: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: products
            }
            return res.status(200).json(response)

        } catch (error) {
            throwError(res, error)
        }
    },

    
}