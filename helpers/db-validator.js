const { response } = require('express')
const Role = require("../models/role");
const Usuario = require("../models/user");

const esRolValido = async (role = "") => {
  const existeRol = await Role.findOne({ role });
  if (!existeRol) {
    throw new Error(`El rol ${role} no es valido`);
  }
};

const existeEmail = async(correo) => {
  //verifico si existe el correo
  const existe = await Usuario.findOne({ correo: correo });
  if (existe) {
    throw new Error(`El email ${correo} ya esta asociado a un usuario`)
  }
}

const existeUsuario = async(id) => {
  const existeUser = await Usuario.findById(id)
  if( !existeUser ){
    throw new Error(`El usuario con el id: ${id} NO existe`)
  }
}

module.exports = {
  esRolValido,
  existeEmail,
  existeUsuario
};
