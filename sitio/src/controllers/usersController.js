const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')
const fs = require("fs");
const path = require("path");
const users = require('../data/users.json');
const db = require('../database/models');


module.exports ={

    // vista register
    register: (req,res) => { 
        
        res.render('user/register')

        },

        processRegister : (req, res) => {
            let errors = validationResult(req);

            if(errors.isEmpty()){
                const {name, email, password,imgUser} = req.body;
                db.User.create({
                    name : name.trim(),
                    email : email.trim(),
                    password : bcrypt.hashSync(password, 10),
                    rol : 2,
                    imgUser : req.file ? req.file.filename : "avatar.png",
                })
                .then(user => {
                    req.session.userLogin = {
                        id : userId,
                        name : user.name,
                        avatar : user.avatar,
                        rolId : user.rolId
                    }
                    return res.redirect('/')
                })
                
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
            let {email,recordame} = req.body;
            db.User.findOne({
                where : {
                    email : email
                }
            })
            .then(user => {
                req.session.userLogin = {
                    id : user.id,
                    name : user.name,
                    img : user.avatar,
                    rol : user.rolId
                }
                if(recordame){
                    res.cookie('LaGrutaDelDragon', req.session.userLogin,{maxAge: 365 * 24 * 60 * 60 * 1000})
                }
                return res.redirect('/')
            })
            .catch(error => console.log(error))
        }else{
            return res.render('user/login',{
                errors : errors.mapped()
            }
        )}
    },

    profile : (req,res) => {
        db.User.findByPk(req.sessionLogin)
        .then((user) => {
            res.render('profile', {
                user,
                session: req.sessionLogin,
            })
        })
        .catch(error => console.log(error))
    },

    profileEdit: (req, res) => {
        res.render('profileEdit')

        let errors = validationResult(req);
        
        if(errors.isEmpty()){

            let {name,email,password} = req.body

            db.User.update({
                name,
                email,
                password,
                avatar : req.file ? req.file.filename : user.avatar
            },{
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.redirect('profile')
            })
            .catch(error => console.log(error))
        }
    },

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