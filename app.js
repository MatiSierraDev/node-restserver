// //WEB SERVER
// const express = require('express');
// const path = require('path');


// const app = express();
// const port = process.env.PORT;

// app.use( express.static( 'public' ) );//middelware

// app.get('/', ( req, res ) => { //routes
//   res.sendFile(path.join( __dirname, '/public/index.html'))
// })

// app.listen(port, () => {
  //   console.log(`Listen on port: ${port}`)
  // });
  
require('dotenv').config();

const Server = require("./models/server");

const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    
    await mongoose.connect(process.env.MONGODB_CNN);
    
    console.log("Conectado a la base de datos!");
    
    const server = new Server();
    
    server.listen();

  } catch (error) {
    console.log(error)
  }
};

dbConnection();