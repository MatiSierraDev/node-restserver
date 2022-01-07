const { response, request } = require("express");

const Usuario = require('../models/user');

const brcrypjs = require('bcryptjs');

const { generarJWT } = require("../helpers/generar-jwt");
const { googleJWT } = require("../helpers/google-jwt");


const postLogin = async(req = request , res = response) =>{

  const  {correo, password} = req.body;
  
  try{

    // validacion de correo(existe)
    const usuario = await Usuario.findOne({ correo });

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
    const token = await generarJWT(usuario.id)
    const { nombre} = usuario;

    res.status(200).json({
      usuario,
      nombre,
      token
    });

  }catch(err){

    res.status(400).json({
      msg: 'Algo salio mal consulte con el administrador de la db'
    })    
  
  }
}

const googleToken = async(req = request, res = response ) => {
  
  const { id_token } = req.body;
  
  try{
    
    // const googleUser = await googleJWT(id_token);
    // console.log( googleUser )

    const { nombre, img, correo } = await googleJWT(id_token);
    //Busco usuario por correo
    let usuario = await Usuario.findOne({ correo })
    
    //sino existe lo creo con las credencales de los servicios de google
    if(!usuario){

      const data = {
        nombre,
        img,
        correo,
        password: ':P',
        google: true
      }

      //Creo un nuveo usuario
      usuario = new Usuario(data);
      
      //Guardar en la base de datos
      await usuario.save();
    }

    const token = await generarJWT(usuario.id);

    res.status(200).json({
       msg: 'Usuario de google verificado correctamente',
       usuario,
       token
      }
    )

  }catch(err){
    console.log(err)

    res.status(404).json({
      msg: `${err}`
    })
  }

}

module.exports = {
  postLogin,
  googleToken
}