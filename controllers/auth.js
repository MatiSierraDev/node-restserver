const { response, request } = require("express");
const Usuario = require('../models/user');

const brcrypjs = require('bcryptjs');

const { generarJWT } = require("../helpers/generar-jwt");

const postLogin = async(req = request , res = response) =>{

  const  {correo, password} = req.body;
  
  try{

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
  
    //generando JWT
    const  uid  = usuario.id
    const token = await generarJWT(usuario.id)
    const { nombre } = usuario;

    res.status(200).json({
      nombre,
      token,
      uid
    });

  }catch(err){

    res.status(400).json({
      msg: 'Algo salio mal consulte con el administrador de la db'
    })    
  
  }
}

module.exports = {
  postLogin
}