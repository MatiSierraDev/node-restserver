const { request, response } = require('express');


const validarRol = ( req = request, res = response, next) => {

  if(!req.usuarioAutenticado) {
    return res.status(500).json({
      msg: "Error con el usuario autenticado",
    });

  }

  const usuario = req.usuarioAutenticado;

  if(usuario.rol !== 'ADMIN_ROL'){
    return res.status(400).json({
      msg:'Debe tener un rol de administrador para realizar esta operacion',
      usuario
    })
  }

  next();

}


module.exports = {
  validarRol
}
