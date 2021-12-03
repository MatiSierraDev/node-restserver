const { Router } = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { validarRol, tieneRol } = require('../middlewares/validar-rol');
const {
  validarCampos,
  validarJWT,
  tieneRol,
  validarRol
}  = require('../middlewares');

const {
  esRolValido,
  existeEmail,
  existeUsuario,
} = require("../helpers/db-validator");

const { 
  usersGet,
  usersPost,
  usersPut,
  usersDelete
}  = require('../controllers/users');

const router = Router();

router.get("/", usersGet);

router.put(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeUsuario),
    check("role").custom((role) => esRolValido(role)),
    validarCampos,
  ],
  usersPut
);

router.post("/", [ 
  check('nombre', 'Debe ingresar un nombre').not().isEmpty(),
  check('correo', 'El correo no es valido').isEmail(),
  check('correo').custom(existeEmail),
  check('password', 'El password debe ser de al menos 5 caracteres').isLength({ min: 5 }),
  check('role').custom( (role) => esRolValido(role) ),

  //guarda los errores y los retorna
  validarCampos
], usersPost);


router.delete("/:id", [
  validarJWT,
  // validarRol,
  tieneRol('ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'),
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(existeUsuario)
] ,usersDelete);

module.exports = router;