const usuarios = require('../models').usuarios;
const jwt =  require('../services/jwt')

function create(req,res){
    usuarios.create(req.body)
    .then(usuario=>{
        res.status(200).send({usuario});
    })
    .catch(err=>{
        res.status(500).send({err});
    })
}


function login(req, res){
    usuarios.findOne({
        where:{
            usuario: req.body.usuario,
            password: req.body.password
        }
    })
    .then(usuario=>{
        if(usuario){
            if(req.body.token){
                res.status(200).send({
                    "token": jwt.createToken(usuario)
                })
            }else{
                res.status(200).send({
                    "estado":true,
                    "usuario": usuario,
                    "token": jwt.createToken(usuario)
                })
            }
        }else{
            res.status(200).send({
                "estado":false,
                "usuario": null 
            })            
        }
    })
    .catch(err=>{
        res.status(500).send({
            mensaje:"Ocurrio un error el buscar"
        })
    })
}


function getAll(req, res){
    usuarios.all()
    .then(usuarios=>{
        res.status(200).send(usuarios)
    })
    .catch(err=>{
        res.status(500).send({
            mensaje:"Ocurrio un error",
            error: err
        })
    })
}

module.exports = {
    create,
    login,
    getAll
}