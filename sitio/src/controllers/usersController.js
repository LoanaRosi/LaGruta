const {validationResult} = require('express-validator')
const fs = require("fs");
const path = require("path");

const users = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","users.json"),"utf-8"));

const saveUser = dato => fs.writeFileSync(path.join(__dirname,"..","data","users.json"),JSON.stringify(dato,null,2),"utf-8");

module.exports ={
    //vista login
    login: (req,res) =>{
        let errors = validationResult(req);
        if(errors.isEmpty()) {
            return res.render("user/login")
        } else {
            res.render("user/login", {errors: errors.array(),
            old: req.body});
        }
    },

    // vista register
    register: (req,res) =>{
        let errors = validationResult(req);
        if(errors.isEmpty()) {
            return res.render("user/register")
        } else {
            res.render("user/register", {errors: errors.array(),
            old: req.body});
        }
        
    },

    proccesRegister:(req,res)=>{
        const{name,email,password,passworConfirm}=req.body

        userRegister={
            id: users[users.length -1] ? users[users.length -1].id +1 : 1,
            name : name.trim(),
            email: email.trim(),
            password,
            passworConfirm,
            rol: "user"
        }
        users.push(userRegister);
        saveUser(users);
        res.redirect("/");
    },

    admin : (req,res) => {
        return res.render('admin/index',{
            title : "Administración"
        })
    }
}