const jsonwebtoken = require('jsonwebtoken');


const generarJWT = (uid) => {

  return new Promise(( resolve, reject ) => {

    const payload = { uid }

    jsonwebtoken.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: '4h'
      }, (err, token) => {

        if(err){

          console.log('Hubo un error en el JWT')
          reject(err)
          return;
        
        }else{
        
          resolve(token)
          return;
        }
    })

  })

}

module.exports = {
  generarJWT
}