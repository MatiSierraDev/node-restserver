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
  
const mongoose = require("mongoose");
const Server = require("./models/server");
require('dotenv').config();

  // const { dbConnection } = require("./database/config")
const db = async () =>{

    try {
      await mongoose.connect(
        "mongodb+srv://user_node_cafe:D8jl9MOTrbuVVBx6@miclustercafe.q71ma.mongodb.net/cafeDB?"
      );
      console.log("Conectado a la base de datos.");
  
      const server = new Server();
  
      server.listen();
  
    } catch (error) {
      console.log(error);
    }
  }
  
  db()

// dbConnection()
//   .then( ()=> {
    
//     const Server = require("./models/server");
    
//     const server = new Server();
    
//     server.listen();
//   }).catch((err) => console.log(err));