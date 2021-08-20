
module.exports ={
    //vista login
    login: (req,res) =>{
        return res.render("user/login")
    },
    // vista register
    register: (req,res) =>{
        return res.render("user/register")
    }
}