module.exports = (req,res,next) => {
    if(req.session.userLogin && req.session.userLogin.rol === ""){
        res.redirect('/')
    }else{
        next()
    }
}

// esto va en la ruta de profile