
module.exports ={
    index : (req,res) =>{
        return res.render("home")
    },

    cartShop: (req,res) =>{
        return res.render("productCart")
    }
}