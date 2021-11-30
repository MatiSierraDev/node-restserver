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
    req.usuarioAutenticado = await Usuario.findById(uid) 

    //mando el uid a la request
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