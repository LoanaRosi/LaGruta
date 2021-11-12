module.exports = (req,res,next) => {
    if(req.session.userLogin && req.session.userLogin.rol){
        next()
    }else{
       
        res.redirect('/user/login')
    }
}

// esto va en la ruta de profile
