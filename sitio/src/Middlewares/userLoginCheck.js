module.exports = (req,res,next) => {
    if(req.session.userLogin && req.session.userLogin.rol === 2 /*  || req.session.userLogin && req.session.userLogin.rol === "admin"   */){
        res.redirect('/')
    }else{
        next()
    }
}