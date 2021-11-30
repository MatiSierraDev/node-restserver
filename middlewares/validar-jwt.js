const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/user');


const validarJWT = async(req = request, res = response, next ) => {
  
  //consulto que los headers sean los necesarios
  const token = req.header("x-token")
  
  //verifico que no este vacio
  if(!token){
    return res.status(401).json({
      msg: 'No hay token en la peticion.'
    })
  }

  try{

    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //Leer el usuario que corresponde al uid
    const usuario  = await Usuario.findById(uid)
    
    //valido que el usuario no se null o undefined
    if(!usuario){
      return res.status(401).json({
        msg:'Token no valido - usuario no existe'
      })
    }

    //validar el estado del usuario simfue eliminado o no
    if(!usuario.estado) {
      return res.status(401).json({
        msg: 'Token no valido - El estado del usuario es falso'
      })
    }
    
    //mando el uid a la request
    req.usuarioAutenticado = usuario;
    req.uid = uid;

    next();

  }catch(err){
  
    return res.status(400).json({
      msg: 'Error con el token.'
    })
  
  }

}


module.exports = {
  validarJWT
}