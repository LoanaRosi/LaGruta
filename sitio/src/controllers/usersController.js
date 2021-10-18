const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')
const fs = require("fs");
const path = require("path");
const users = require('../data/users.json');
const db = require('../database/models');


module.exports ={

    // vista register
    register: (req,res) => { 
        db.Avatar.findAll()
        .then(avatars => {
            res.render('user/register', {
                avatars
            })
        })
        .catch(error => console.log(error))
        },

        processRegister : (req, res) => {
            let errors = validationResult(req);

            if(errors.isEmpty()){
                const {name, email, password,imgUser} = req.body;
                db.User.create({
                    name : name.trim(),
                    email : email.trim(),
                    password : bcrypt.hashSync(password.trim(), 10),
                    rolId : 2,
                    avatarId : imgUser
                })
                    .then(user => {
                        req.session.userLogin = {
                    id : user.id,
                    name : user.name,
                    rol : user.rol,
                    img : user.imgUser
                }
                return res.redirect('/')

                })
                .catch(error => console.log(error))
                
            }else{
                return res.render('user/register',{
                    old : req.body,
                    errors : errors.mapped()
                })
            }
    },

    //vista login
    login : (req,res) => res.render('user/login'),
    
    processLogin : (req,res) => {
        let errors = validationResult(req);

        
        if(errors.isEmpty()){
            let user = users.find(user => user.email === req.body.email.trim());

            req.session.userLogin = {
                id : user.id,
                name : user.name,
                rol : user.rol,
                img : user.imgUser
            }
            const{recordar} = req.body
            
            if(recordar){
                res.cookie("recordame", req.session.userLogin, {maxAge: 365 * 24 * 60 * 60 * 1000})
            }
            
            if(user.rol === "admin"){
                res.redirect("/user/admin")
            }
            res.redirect('profile')

        }else{
            return res.render('user/login',{
                errors : errors.mapped()
            })
        }
    },

    profile : (req,res) => res.render('profile'),

    profileEdit: (req, res) => res.render('profileEdit'),

    logout : (req,res) => {
        res.cookie("recordame",null,{maxAge : -1})
        req.session.destroy();
        res.redirect('/')
    },

    //vista admin
    admin: (req, res) => {
        const products = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"));
        return res.render("admin/admin",{products})
        
    }
}