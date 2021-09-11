const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = () => {
  const contato = Schema({
    nome: String,
    email: String
  });
  const usuario = Schema({
    nome: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      index: { unique: true }
    },
    contatos: [contato]
  });
  return mongoose.model('usuarios', usuario);
};