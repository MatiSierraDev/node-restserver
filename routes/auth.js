const { Router } = require("express");
const { check } = require("express-validator");

const { postLogin, googleToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post("/login", [
    check("correo", "No es un correo valido").isEmail(),
    check("password", "La contraseña es obligatorio").not().isEmpty(),
    check("password", "El password debe ser de al menos 5 caracteres").isLength({ min: 5 }),
    validarCampos,
  ],
  postLogin
);

router.post("/google", [
    check("id_token", "El token es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  googleToken
);

module.exports = router;
