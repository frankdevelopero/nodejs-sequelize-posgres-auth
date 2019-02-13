var nJwt = require('njwt')
var config = require('../config/config');
var secret = config.token_secret;

function auth(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({
            mensaje:"La peticion no tiene la cabecera de autenticación"
        })
    }
    var token = req.headers.authorization.replace(/['"]+/g,'')
    var payload = nJwt.verify(token, secret, (err, verifiedJwt)=>{
        if(err){
            return res.status(401).send({
                mensaje:"Acceso no autorizado, token no válido o expirado"
            })
        }else{
            next()
        }
    })
}

module.exports ={
    auth
}