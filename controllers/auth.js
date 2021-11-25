const { response, request } = require("express");



const postLogin = (req = request , res = response) =>{

  const  {correo, password} = req.body;

  res.status(200).json({
    correo,
    password
  });
  
}

module.exports = {
  postLogin
}