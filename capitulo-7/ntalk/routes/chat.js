const autenticar = require('./../middlewares/autenticador');

module.exports = (app) => {
  const { chat } = app.controllers;
  app.get('/chat', autenticar, chat.index);
};