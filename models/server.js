const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.port = process.env.PORT || 3000;
    this.app = express();
    
    this.api = '/api/users';
    this.auth = '/api/auth';
    
    //db connection
    this.getDb();

    //midelware
    this.middleware();

    //routes
    this.routes();
  }


  async getDb(){
    await dbConnection();
  }

  middleware(){

    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static('public'));
  }

  routes(){

    this.app.use(this.auth, require('../routes/auth'))
    this.app.use(this.api, require( '../routes/users' ));

    this.app.get('*', (req, res) => {
      res.send('Error');
    })

    this.app.put('*', (req, res) => {
      res.send('Error');
    })
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log(`Listen on port: ${this.port}`)
    })
  }
}

module.exports = Server;