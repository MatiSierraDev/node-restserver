const mongoose = require('mongoose');

const dbConnection = async () => {

  try {
      await mongoose.connect(process.env.MONGODB_CNN)
    .then(res => console.log('Conectado a la base de datos!'));

  } catch (error) {
      throw new Error('Error a la hora de inicializar el proceso')
  }

}

//   await mongoose
//     .connect(process.env.MONGODB_CNN, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then((x) => {
//       console.log(
//         `Connected to Mongo! Database name: "${x.connections[0].name}"`
//       );
//     })
//     .catch((err) => {
//       console.error("Error connecting to mongo", err);
//     });
// }

module.exports = {
  dbConnection
}