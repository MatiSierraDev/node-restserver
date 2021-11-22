const mongoose = require('mongoose');

const dbConnection = async () => {

  try {
    await mongoose
      .connect(process.env.MONGODB_CNN)
       console.log("Conectado a la base de datos!")
  
  } catch (error) {
    throw new Error('Error a la hora de inicializar el proceso')
  }

}

module.exports = {
  dbConnection
}