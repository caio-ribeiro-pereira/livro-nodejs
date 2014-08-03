module.exports = function(app) {

  var autenticar = require('./../middlewares/autenticador')
    , chat = app.controllers.chat;

  app.get('/chat', autenticar, chat.index);

};