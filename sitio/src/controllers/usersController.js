const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')
const fs = require("fs");
const path = require("path");
const users = require('../data/users.json');


module.exports ={

    // vista register
    register: (req,res) => res.render('user/register'),
        processRegister : (req, res) => {
            let errors = validationResult(req);

            if(errors.isEmpty()){
                const {name, email, password} = req.body;
                let user = {
                    id : users.length > 0 ? users[users.length -1].id +1 : 1,
                    name : name.trim(),
                    email : email.trim(),
                    password : bcrypt.hashSync(password.trim(), 10),
                    rol : 'user',
                }
                users.push(user);
                fs.writeFileSync(path.join(__dirname, '..', 'data', 'users.json'), JSON.stringify(users, null, 2), 'utf-8');
                res.redirect('/user/login')

                req.session.userLogin = {
                    id : user.id,
                    name : user.name,
                    rol : user.rol
                }
                return res.redirect('/')
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
                rol : user.rol
            }

            if(req.body.recordar){
                res.cookie("Login", req.session.userLogin, {maxAge:1000 * 60})
            }
            res.redirect('/')

        }else{
            return res.render('user/login',{
                errors : errors.mapped()
            })
        }
    },
    profile : (req,res) => res.render('profile'),
    logout : (req,res) => {
        req.session.destroy();

},
    
    admin : (req,res) => {
        return res.render('admin/index',{
            title : "Administración"
        })
    },
}