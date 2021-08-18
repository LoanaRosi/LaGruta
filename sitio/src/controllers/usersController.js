
module.exports ={

    login: (req,res) =>{
        return res.render("user/login")
    },

    register: (req,res) =>{
        return res.render("user/register")
    }
}