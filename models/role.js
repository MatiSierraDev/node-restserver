const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const RoleSchema = new Schema({
  role:{
    type: String,
    required:[ true, 'El rol debe ser obligatorio']
  }
})

module.exports = model('Role', RoleSchema);