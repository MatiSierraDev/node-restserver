const { Router } = require("express");
const { check } = require("express-validator");

const { postLogin } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "No es un correo valido").isEmail(),
    check("password", "La contraseña es obligatorio").not().isEmpty(),
    check("password", "El password debe ser de al menos 5 caracteres").isLength({ min: 5 }),
    validarCampos,
  ],
  postLogin
);

module.exports = router;
