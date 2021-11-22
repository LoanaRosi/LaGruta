const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const fs = require("fs");
const path = require("path");
const users = require('../data/users.json');
const db = require('../database/models');
const avatar = require('../database/models/avatar');


module.exports = {

    // vista register
    register: (req, res) => {

        res.render('user/register',{
            title : "Registro"
        })

    },

    processRegister: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const { name, email, password } = req.body;

            switch (true) {
                case req.files.length != 0:
                    
                    let images = req.files.map(image => {
                        let item = {
                            file: image.filename,
                        }
                        return item
                    })
                
                    db.Avatar.bulkCreate(images, { validate: true })
                        .then(avatarImg => {
                            console.log('imagenes guardadas')
                            db.User.create({
                                name: name.trim(),
                                email: email.trim(),
                                password: bcrypt.hashSync(password, 10),
                                avatarId: avatarImg[0].dataValues.id,
                                rolId: 2,
                            })
                                .then(user => {
    
                                    req.session.userLogin = {
                                        id: user.id,
                                        name: user.name,
                                        avatar: user.avatarId,
                                        rol: user.rolId
                                    }
    
                                    return res.redirect('/')
                                })
                            })
                            .catch(error => console.log(error))
                    break;

                    case req.files == 0 :

                        db.User.create({
                            name: name.trim(),
                            email: email.trim(),
                            password: bcrypt.hashSync(password, 10),
                            avatarId: 1,
                            rolId: 2,
                        })
                            .then(user => {

                                req.session.userLogin = {
                                    id: user.id,
                                    name: user.name,
                                    avatar: user.avatarId,
                                    rol: user.rolId
                                }

                                return res.redirect('/')
                            })
                            .catch(error => console.log(error))

                    break;

                default:
                    return res.render('user/register', {
                        old: req.body,
                        errors: errors.mapped()
                    })
            } 
        } else {
            return res.render('user/register', {
                old: req.body,
                errors: errors.mapped()
            })
        }
    },

    //vista login
    login: (req, res) => res.render('user/login',{
        title : "Ingreso"
    }),

    processLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let { email, recordame } = req.body;
            db.User.findOne({
                where: {
                    email: email
                }
            })
                .then(user => {
                    req.session.userLogin = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar,
                        rol: user.rolId
                    }
                    
                    if (recordame) {
                        res.cookie('LaGrutaDelDragon', req.session.userLogin, { maxAge: 1 * 365 * 24 * 60 * 60 })
                    }

                    /*  carrito */

                    req.session.cart = [] // va a hacer un array de objetos literales donde cada producto agregado se guarde ahi
                    
                    db.Order.findOne({
                        where :{
                            userId : req.session.userLogin.id,
                            status : "pending"
                        },
                        include : [
                            {
                                association : 'carts',
                                include :[
                                    {
                                        association : 'product',
                                        include : ['categories','images']
                                    }
                                ]
                            }
                        ]
                    }).then( order => {
                        if(order){
                            order.carts.forEach(item => {
                                let product = {
                                    id : item.productId,
                                    name : item.product.name,
                                    image : item.product.images[0].file,
                                    price : item.product.price,
                                    discount : item.product.discount,
                                    category : item.product.categories.name,
                                    amount: +item.quantity,
                                    subTotal : item.product.price * item.quantity,
                                    orderId : order.id

                                }
                                req.session.cart.push(product)
                            })
                        }
                        return res.redirect('/')
                    })
                })
                .catch(error => console.log(error))
        } else {
            return res.render('user/login', {
                errors: errors.mapped()
            })
        }
    },


    profile: async(req,res) => {
        let user = await db.User.findByPk(req.session.userLogin.id)
        let avatar = await db.Avatar.findByPk(user.avatarId);
        res.render('user/profile', {
            user,
            avatar,
            session: req.session,
            title : "Perfil"
        })
    },

    profileEdit: async(req, res) => {
        let user = await db.User.findByPk(req.session.userLogin.id,{
            include : ["avatars"]
        });
        res.render('profileEdit', {
            user,
            title : "Edición De Perfil"
        });
    },

    profileUpdate: async(req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
        const { name, email, password } = req.body;
        await db.User.update({
            name : name,
            email : email,
            password : bcrypt.hashSync(password, 10),
        },
        {
            where: { id : req.session.userLogin.id }
        }).then(() => {
            console.log("guardado")
            res.redirect("/");
        });
        /* res.cookie("recordame", null, { maxAge: -1 })
        req.session.destroy(); */
        
        } else {
            let user = await db.User.findByPk(req.session.userLogin.id,{
                include : ["avatars"]
            })

            return res.render('profileEdit', {
                errors: errors.mapped(), 
                user,
                title : "Edición De Perfil"
            })}
    },


    logout: (req, res) => {
        res.cookie("recordame", null, { maxAge: -1 })
        req.session.destroy();
        res.redirect('/')
    },

    //vista admin
    admin: (req, res) => {

        db.Product.findAll({
            include: [
                "images", "categories"
            ]
        })
            .then(products => {
                res.render("admin/admin", {
                    products,
                    title : "Administración"
                })
            })
            .catch(error => console.log(error))

    }
}

//nombre no se puede poner espacios
//contraseña sacar caracteres especiales



