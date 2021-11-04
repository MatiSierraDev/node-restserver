const { response, request } = require('express');

const usersGet = (req = request , res = response) => {
  //endpoint

  const { q, nombre, apikey} = req.query;

  res.status(201).json({
    msg: `create GET APi `,
    q,
    nombre,
    apikey
  });
};

const usersPost = (req, res = response) => {
  //endpoint

  const { name, apellido } = req.body;

  res.status(201).json({
    msg: `create POST APi `,
    name,
    apellido
  });
};

const usersPut = (req, res = response) => {
  //endpoint

  const {id} = req.params;

  res.status(201).json({
    msg: `create PUT APi `,
    id
  });
};

const usersDelete = (req, res = response) => {
  //endpoint
  res.status(201).json({
    msg: `create DELETE APi `,
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
}; 