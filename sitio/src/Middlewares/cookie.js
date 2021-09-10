function recordame(req, res, next){
    next()

    if(req.cookies.recordame != undefined && req.session.userLogin == undefined) {
        let user = users.find(user => user.email === req.cookies.recordame.trim());

            req.session.userLogin = {
                id : user.id,
                name : user.name,
                rol : user.rol
            }

            req.session.userLogin = userLogin;

    }

}

module.exports = recordame;