const { response, request } = require("express");
const Usuario = require('../models/user');

const brcrypjs = require('bcryptjs');

const postLogin = async(req = request , res = response) =>{

  const  {correo, password} = req.body;


  // validacion de correo(existe)
  const usuario= await Usuario.findOne({ correo });

  if(!usuario){
    return res.status(400).json({
      msg: `El mail: "${correo}" ingresado no existe.`
    })
  }

  // validacion de usuario activo(estado)
  if(!usuario.estado){
    return res.status(400).json({
      msg: `El usuario no existe.`,
    });
  }

  //Verficar la contraseña
  const passwordCompare = brcrypjs.compareSync(password, usuario.password);

  if (!passwordCompare){
    return res.status(400).json({
      msg: "Contraseña invalida."
    })
  }

  res.status(200).json({
    correo,
    password
  });
  
}

module.exports = {
  postLogin
}