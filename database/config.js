const mongoose = require('mongoose');

const dbConnection = () => {

    mongoose.connect("mongodb+srv://user_node_cafe:D8jl9MOTrbuVVBx6@miclustercafe.q71ma.mongodb.net/cafeDB",
      {
        useUnifiedTopology: true,
      }
    )
    .catch((err) => console.log(err.reason));
}

module.exports = {
  dbConnection
}