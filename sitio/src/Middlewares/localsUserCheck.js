module.exports = (req, res, next) => {
	if(req.session.userLogin){
	res.locals.userLogin = req.session.userLogin
	}
	next()
}

//todo lo que esta en session cuando el user se loguea va a estar en userLogin que esta dentro de locals. Para acceder a los datos desde el cliente


