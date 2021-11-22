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

const { dbConnection } = require('./database/config')

const Server = require("./models/server");

dbConnection()
.then(() => {
  const server = new Server();
  server.listen();
}) 
