
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) =>{
	const authHeader = req.headers.token;
	if (authHeader) {
		const token = authHeader.split(" ")[1];
	  	jwt.verify(token, process.env.JWT_SEC, (err, user)=>{
			if(err) res.status(403).json('error ' + token)
            req.user = user;
            next()
		}) 

	}else{
		return res.status(401).json('You are not authentificated!')
	}
} 

const verifyTokenAndAutorization = (req, res, next) =>{
	verifyToken(req, res, ()=>{
		if(req.user.id === req.params.id || req.user.isAdmin){
		  next();
		  console.log(req.user.isAdmin+' line23 ')
		}else{
			res.status(403).json(req.user.id+' error '+req.params.id+' '+req.user.isAdmin)
		}
	})
}

const verifyTokenAndAdmin = (req, res, next) =>{
	verifyToken(req, res, ()=>{
		if(req.user.isAdmin){
			next();
		}else{
			res.status(403).json('You are not alowed to do that!'+ req.user.isAdmin+' '+req.user.id+' '+req.params.id)
		}
	})
}


module.exports = {verifyToken, verifyTokenAndAutorization, verifyTokenAndAdmin}

