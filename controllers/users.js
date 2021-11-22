const { response, request } = require('express');
const bcryp = require('bcryptjs');
const Usuario = require('../models/user');

const usersGet = async(req = request , res = response) => {
  //endpoint
  // const { q, nombre, apikey} = req.query;
  
  const { limit= 5, skip = 0 } = req.query;
  const query = {estado:true};
  // const allUsers = await Usuario.find(query)
  //   .skip(Number(skip))
  //   .limit(Number(limit));

  // const count = await Usuario.find().countDocuments(query);

    const [count, allUsers] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
      .skip(Number(skip))
      .limit(parseInt(limit)),
    ]);

    res.json({
      count,
      allUsers
    });
};

const usersPost = async(req, res = response) => {
  //endpoint
  const { nombre, correo, password, role } = req.body;
  const usuario = new Usuario({ nombre, correo, password, role });
  
  //encriptar password
  const salt = bcryp.genSaltSync(10);
  usuario.password = bcryp.hashSync(password, salt);
  
  //guardar en la base de datos los datos enviados
  await usuario.save();

  res.status(201).json({
    usuario
  });
};

const usersPut = async(req, res = response) => {
  //endpoint
  const {id} = req.params;
  
  //desestructuro los campos voy a validar antes actualizar
  //No se debe procesar el _id
  const { _id, password, google, correo, ...resto } = req.body;

  //validar contra la base
  if(password){
    const salt = bcryp.genSaltSync(10);
    resto.password = bcryp.hashSync(password, salt);
  }

  //metodo de mongoose par buscar y actualizar con un id dado
  const usuarioUpdate = await Usuario.findByIdAndUpdate( id, resto );

  res.status(201).json({
    msg: `create PUT APi `,
    resto
  });
};

const usersDelete = async(req, res = response) => {
  //endpoint

  const { id } = req.params;
  const query = {estado: false};
  
  //Borrado fisico
  // const userDelete = await Usuario.findByIdAndDelete(id);

  const userDelete = await Usuario.findByIdAndUpdate( id, query)

  res.status(201).json({
    userDelete,
    msg: `El usuario con el id: ${id} ah sido eliminado.`
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
}; 