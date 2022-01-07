const { OAuth2Client } = require("google-auth-library");

// *Meterlo en eun HELPER que reciba el id_token del cliente
// *Como un arrow fuction.. retornar un objeto con lo que voy a guardarlo en la base de datos { name: nombre, img: picture, email }

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleJWT = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { name: nombre, picture: img, email: correo } = ticket.getPayload();

  return {
    nombre,
    img,
    correo,
  };
};

module.exports = {
  googleJWT,
};
