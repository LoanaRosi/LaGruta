const {validationResult} = require('express-validator')

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
        return res.render("user/register")
    },
    admin : (req,res) => {
        return res.render('admin/index',{
            title : "Administración"
        })
    }
}