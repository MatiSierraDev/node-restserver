const mongoose = require('mongoose');

const dbConnection = async () => {

  try {
    await mongoose.connect(process.env.MONGODB_CNN)
    .then(res => console.log('Conectado a la base de datos!'));
  
  } catch (error) {
    throw new Error(error)
  }

}

module.exports = {
  dbConnection
}