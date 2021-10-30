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

        res.render('user/register')

    },

    processRegister: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const { name, email, password } = req.body;

            if (req.files.length != 0) {
                console.log(req.files);
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
                            email: email.trim(), // aca no pueder it name, tiene que estar el valor del gmail que viene del formulario gracias a la etiqueta name
                            password: bcrypt.hashSync(password, 10),
                            avatarId: avatarImg[0].dataValues.id,
                            rolId: 2,
                        })
                            .then(user => {

                                req.session.userLogin = {
                                    id: user.id,
                                    name: user.name,
                                    avatar: user.avatarId,
                                    rolId: user.rolId
                                }

                                return res.redirect('/')
                            })
                            .catch(error => console.log(error))
                    })
            } else {
                db.User.create({
                    name: name.trim(),
                    email: email.trim(), // aca no pueder it name, tiene que estar el valor del gmail que viene del formulario gracias a la etiqueta name
                    password: bcrypt.hashSync(password, 10),
                    avatarId: 1,
                    rolId: 2,
                })
                    .then(user => {

                        req.session.userLogin = {
                            id: user.id,
                            name: user.name,
                            rolId: user.rolId
                        }

                        return res.redirect('/')
                    })
                    .catch(error => console.log(error))
            }

        } else {
            return res.render('user/register', {
                old: req.body,
                errors: errors.mapped()
            })
        }
    },

    //vista login
    login: (req, res) => res.render('user/login'),

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
                        rol: user.rolId// ahora en las vistas tene que pregunta por un numero, no por si es "admin" o "user"
                    }
                    if (recordame) {
                        res.cookie('LaGrutaDelDragon', req.session.userLogin, { maxAge: 365 * 24 * 60 * 60 * 1000 })
                    }
                    return res.redirect('/')
                })
                .catch(error => console.log(error))
        } else {
            return res.render('user/login', {
                errors: errors.mapped()
            }
            )
        }
    },


    profile: async(req,res) => {
        let user = await db.User.findByPk(req.session.userLogin.id)
        let avatar = await db.Avatar.findByPk(user.avatarId);
        res.render("profile", {
            user,
            avatar,
            session: req.session
        })
    },

    profileEdit: async(req, res) => {
        let user = await db.User.findByPk(req.session.userLogin.id);
        res.render('profileEdit', {
            user,
        });
    },

    profileUpdate: async(req, res) => {
        const { name, email, password } = req.body;
        await db.User.update({
            name,
            email,
            password : bcrypt.hashSync(password, 10),
        },
        {
            where: { id : req.session.userLogin.id }
        });
        res.cookie("recordame", null, { maxAge: -1 })
        req.session.destroy();
        res.redirect("/");
    },

/*     profileEdit: (req, res) => {
        // res.render('profileEdit');

        let errors = validationResult(req);
        if(errors.isEmpty()){
            let { name, email, password } = req.body
            db.User.update({
                name,
                email,
                password
            }, 
            {
                where: {
                    id: req.session.userLogin.id
                }
            })
                .then(() => {
                    res.redirect('profile')
                })
                .catch(error => console.log(error))
        }      
        
    }, */

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
                })
            })
            .catch(error => console.log(error))

    }
}