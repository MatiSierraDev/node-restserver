const mongoose = require('mongoose');

const dbConnection = async () => {

  try {
    await mongoose.connect('mongodb+srv://user_node_cafe:D8jl9MOTrbuVVBx6@miclustercafe.q71ma.mongodb.net/cafeDB');

    console.log("Conectado a la base de datos")
  
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de inicializar el proceso')
  }

}

module.exports = {
  dbConnection
}