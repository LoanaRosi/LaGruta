const fs = require("fs");
const path = require("path");

const users = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","users.json"),"utf-8"));

const saveUser = dato => fs.writeFileSync(path.join(__dirname,"..","data","users.json"),JSON.stringify(dato,null,2),"utf-8");

module.exports ={
    //vista login
    login: (req,res) =>{
        return res.render("user/login")
    },

    // vista register
    register: (req,res) =>{
        return res.render("user/register")
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