const { request, response } = require('express');


const validarRol = ( req = request, res = response, next) => {

  if(!req.usuarioAutenticado) {
    return res.status(500).json({
      msg: "Error con el usuario autenticado",
    });

  }

  const { role, nombre } = req.usuarioAutenticado;

  if(role !== 'ADMIN_ROLE'){
    return res.status(400).json({
      msg:`El usuario ${nombre} no tiene un rol de administrador para realizar esta operacion`,
      // usuario
    })
  }

  next();

}

const tieneRol = ( ...roles ) => {

    return (req = request, res = response , next) => {

      if (!req.usuarioAutenticado) {
        return res.status(500).json({
          msg: "Error con el usuario autenticado",
        });
      }

      const { role } = req.usuarioAutenticado;
      
      if(!roles.includes(role)) {
        return res.status(401).json({
          msg: `El servicio requiere uno de estos roles ${roles}`
        })
      }

      next()

    }

}


module.exports = {
  validarRol,
  tieneRol
}
