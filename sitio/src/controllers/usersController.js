
module.exports ={

    login: (req,res) =>{
        return res.render("user/login")
    },

    register: (req,res) =>{
        return res.render("user/register")
    },
    admin : (req,res) => {
        return res.render('admin/index',{
            title : "Administración"
        })
    }
}